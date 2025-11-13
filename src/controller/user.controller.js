import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import bcrypt from "bcrypt";
import userModel from "../model/user.model.js";
import { sendOTP, generateOTP } from "../helper/email.js"

export const register = async (req, res, next) => {
  try {
    const { username, email, password, role, status } = req.body
    const existing = await userModel.findOne({ email })

    if (existing) {
      if (existing.isVerified) {
        return res.status(400).json({
          message: "Bu email allaqachon ro'yxatdan o'tgan va tasdiqlangan.",
        });
      } else {
        const newOtp = generateOTP().toString()
        existing.otp = newOtp
        existing.otpExpiresAt = Date.now() + 5 * 60 * 1000 // 5 min
        await existing.save()
        await sendOTP(email, existing.username, newOtp);

        return res.status(200).json({
          message:
            "Siz avval ro'yxatdan o'tgansiz, lekin email tasdiqlanmagan. Yangi tasdiqlash kodi emailingizga yuborildi.",
        })
      }
    }
    const otp = generateOTP().toString()
    const user = await userModel.create({
      username,
      email,
      password,
      role,
      status,
      otp,
      otpExpiresAt: Date.now() + 5 * 60 * 1000,
      isVerified: false,
    })
    await sendOTP(email, username, otp);
    res.status(201).json({
      message: "Foydalanuvchi yaratildi. Tasdiqlash kodi emailingizga yuborildi.",
      data: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    })
  } catch (error) {
    console.error("Register error:", error);
    next(error)
  }
}


export const verify = async (req, res, next) => {
  try {
    const { email, code } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: `Bunday foydalanuvchi topilmadi.`})
    }
    if (user.isVerified) {
      return res.status(400).json({ message: `Bu hisob allaqachon tasdiqlangan.` })
    }
    if (String(user.otp) !== String(code)) {
      return res.status(400).json({ message: `Kiritilgan tasdiqlash kodi notogri. ` })
    }

    if (user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Tasdiqlash kodi muddati tugagan. Iltimos, qayta ro'yxatdan o'ting." })
    }

    user.isVerified = true
    user.status = "active"
    user.otp = null
    user.otpExpiresAt = null
    await user.save()

    return res.status(200).json({
      message: "Email muvaffaqiyatli tasdiqlandi.",
      data: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status,
      },
    })
  } catch (error) {
    console.error("Verify error:", error)
    next(error)
  }
}

const generateAccessToken = (payload) => jwt.sign(payload, config.jwt.accessSecret, { expiresIn: "1h" });
const generateRefreshToken = (payload) => jwt.sign(payload, config.jwt.refreshSecret, { expiresIn: "7d" });

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    if (!user.isVerified) return res.status(403).json({ message: "Hisob tasdiqlanmagan" });

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(400).json({ message: "Email yoki parol xato" });

    const accessToken = generateAccessToken({ id: user._id, username: user.username, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    user.accessToken = accessToken
    user.refreshToken = refreshToken
    await user.save()

    res.status(200).json({
      message: "Kirish muvaffaqiyatli",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      accessToken,
      refreshToken
    })
  } catch (error) {
    console.error("Login error:", error);
    next(error)
  }
}




export const accessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token topilmadi." })
    }
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, config.jwt.accessSecret)
    const user = await userModel.findById(decoded.id).select("-password -otp -otpExpiresAt")
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi." })
    }
    res.status(200).json({ message: "Token tasdiqlandi.", data: user })
  } catch (error) {
    console.log(error);
    next(error)
  }
}


export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token topilmadi." })
    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret)
    const user = await userModel.findById(decoded.id)
    if (!user){
        return res.status(404).json({ message: `user not found `})
    }
    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      config.jwt.accessSecret,
      { expiresIn: "1h" }
    )
    res.status(200).json({
      message: "Yangi access token yaratildi.",
      accessToken: newAccessToken,
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
}


export const create = async (req, res, next) => {
  try {
    const { password, ...restData } = req.body
    if (!password) {
      return res.status(400).json({ message: "Password required" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const createUser = await userModel.create({ ...restData, password: hashedPassword })
    const { password: pw, ...userWithoutPassword } = createUser.toObject()
    res.status(201).json({ message: "Created user", data: userWithoutPassword })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const users = await userModel.find().select("-password")
    res.status(200).json({
      message: "get all users",
      count: users.length,
      data: users,
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
}


export const getOne = async (req, res, next) => {
  try {
    const getOneUser = await userModel.findById(req.params.id).select("-password")
    if (!getOneUser) {
      return res.status(404).json({ message: `not found ID ${req.params.id} from user` });
    }
    res.status(200).json({ message: `found ID ${req.params.id} from user`, data: getOneUser })
  } catch (error) {
    console.log(error);
    next(error)
  }
}


export const update = async (req, res, next) => {
  try {
    const { id } = req.params
    const { password, ...rest } = req.body
    const user = await userModel.findById(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword
    }
    Object.assign(user, rest)
    await user.save()
    const updatedUser = await userModel.findById(id).select("-password")
    res.status(200).json({ message: "User updated", user: updatedUser })
  } catch (error) {
    console.log(error);
    next(error)
  }
}


export const deleted = async (req, res, next) => {
  try {
    const deleteUser = await userModel.findByIdAndDelete(req.params.id)
    if (!deleteUser) {
      return res.status(404).json({ message: `not found ID ${req.params.id} from user` });
    }
    res.status(200).json({ message: `deleted user` })
  } catch (error) {
    console.log(error);
    next(error)
  }
}


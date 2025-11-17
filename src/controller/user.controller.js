import db from "../db/knex.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const createAccessToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "15m" });

const createRefreshToken = (user) =>
  jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

export const register = async (req, res, next) => {
  try {
    const { email, username, password, role } = req.body;

    const existing = await db("users").where({ email }).first();
    if (existing) {
      return res.status(400).json({ message: "Email oldin ro'yxatdan o'tgan" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const [user] = await db("users")
      .insert({
        email,
        username,
        password: hashed,
        role: role || "user",
        otp,
        otp_expires_at: otpExpires,
        is_verified: false,
      })
      .returning("*"); 

    await transporter.sendMail({
      to: email,
      subject: "Email tasdiqlash OTP",
      html: `<h3>Sizning OTP kodingiz: <b>${otp}</b></h3>`,
    });

    res.status(201).json({ message: "Ro'yxatdan o'tildi. Emailga OTP yuborildi.", userId: user.id });
  } catch (error) {
    console.error("register xato:", error.message);
    next(error);
  }
};

export const verify = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await db("users").where({ email }).first();
    if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    if (user.is_verified) return res.json({ message: "Email allaqachon tasdiqlangan" });

    if (user.otp !== otp) return res.status(400).json({ message: "OTP noto'g'ri" });

    if (new Date() > user.otp_expires_at) return res.status(400).json({ message: "OTP muddati tugagan" });

    await db("users")
      .where({ email })
      .update({
        is_verified: true,
        otp: null,
        otp_expires_at: null,
        status: "active",
      });

    res.json({ message: "Email tasdiqlandi" });
  } catch (error) {
    console.error("verify xato:", error.message);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db("users").where({ email }).first();
    if (!user) return res.status(404).json({ message: "Email topilmadi" });
    if (!user.is_verified) return res.status(400).json({ message: "Email tasdiqlanmagan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Parol noto'g'ri" });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    const { password: _, ...userData } = user;
    res.json({
      message: "Login muvaffaqiyatli",
      user: userData,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("login xato:", error.message);
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { token } = req.body
    if (!token) return res.status(400).json({ message: "Token yuborilmadi" });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, userData) => {
      if (err) return res.status(403).json({ message: "Refresh token noto'g'ri" });

      const newAccessToken = jwt.sign(
        { id: userData.id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error("refresh xato:", error.message);
    next(error);
  }
};


export const create = async (req, res, next) => {
  try {
    const [user] = await db("users").insert(req.body).returning("*");
    res.status(201).json(user);
  } catch (error) {
    console.error("create xato:", error.message);
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const users = await db("users").select("*");
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json({ count: safeUsers.length, users: safeUsers });
  } catch (error) {
    console.error("getAll xato:", error.message);
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const user = await db("users").where({ id: req.params.id }).first();
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password, ...rest } = user;
    res.json(rest);
  } catch (error) {
    console.error("getOne xato:", error.message);
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await db("users").where({ id: req.params.id }).update(req.body).returning("*");
    if (!updated.length) return res.status(404).json({ message: "User not found" });
    const { password, ...rest } = updated[0];
    res.json(rest);
  } catch (error) {
    console.error("update xato:", error.message);
    next(error);
  }
};

export const deleted = async (req, res, next) => {
  try {
    const deleted = await db("users").where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("delete xato:", error.message);
    next(error);
  }
}







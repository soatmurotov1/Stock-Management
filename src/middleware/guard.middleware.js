import { verifyToken } from "../helper/jwt.js";
import { config } from "../config/index.js";
import userModel from "../model/user.model.js";

export const authGuard = async (req, res, next) => {
  try {
    const authHeader =
      req.headers["authorization"] || req.headers["authheader"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token topilmadi" });
    }

    const token = authHeader.split(" ")[1];
    const verified = verifyToken(token, config.jwt.accessSecret);
    if (!verified) return res.status(403).json({ message: "Token yaroqsiz" });

    let user = await userModel.findById(verified.id);

    if (!user)
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    req.user = user;
    next();
  } catch (error) {
    console.error("authGuard xato:", error.message);
    return res
      .status(403)
      .json({ message: "Token noto'g'ri yoki foydalanuvchi topilmadi" });
  }
};

export const roleGuard = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Token mavjud emas yoki xato" });
    }

    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({
          message: "Sizning ushbu yo'nalishga kirishga ruxsatingiz yo'q",
        });
    }
    next();
  };
};

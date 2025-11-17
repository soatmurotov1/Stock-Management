import jwt from "jsonwebtoken";
import { config } from "../config/index.js";


export const authGuard = (knex) => async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token topilmadi" })
    }

    const token = authHeader.split(" ")[1]

    let verified;
    try {
      verified = jwt.verify(token, process.env.JWT_SECRET || config.jwt.accessSecret)
    } catch (err) {
      console.error("authGuard verify xato:", err.message)
      return res.status(403).json({ message: "Token noto'g'ri yoki muddati tugagan" })
    }

    const user = await knex("users").where({ id: verified.id }).first()

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" })
    }

    req.user = user
    next()
  } catch (error) {
    console.error("authGuard xato:", error.message)
    return res.status(403).json({ message: "Token noto'g'ri yoki foydalanuvchi topilmadi" })
  }
}

export const roleGuard = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Token mavjud emas yoki xato" });
    }

    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Sizning ushbu yo'nalishga kirishga ruxsatingiz yo'q",
      })
    }

    next()
  };
};

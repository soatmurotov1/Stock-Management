import Joi from "joi";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/  // 6 ta=> 1harf+ 1 raqam


export const registerValidation = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Username kiritilishi shart",
    "string.min": "Username kamida 3 ta belgidan iborat bo'lishi kerak",
    "string.max": "Username maksimal 30 ta belgidan iborat bo'lishi mumkin",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email kiritilishi shart",
    "string.email": "Noto'g'ri email manzili",
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    "string.empty": "Parol kiritilishi shart",
    "string.pattern.base": "Parol kamida 6 ta belgidan iborat bo‘lishi, kamida 1 harf va 1 raqamni o‘z ichiga olishi kerak",
  }),
  role: Joi.string().valid("user", "admin", "warehouse_manager").messages({
    "any.only": "Role faqat 'user', 'admin' yoki 'warehouse_manager' bo‘lishi mumkin",
  }),
})


export const loginValidation = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email kiritilishi shart",
    "string.email": "Noto'g'ri email manzili",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Parol kiritilishi shart",
  }),
})


export const createValidation = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Username kiritilishi shart",
    "string.min": "Username kamida 3 ta belgidan iborat bo'lishi kerak",
    "string.max": "Username maksimal 30 ta belgidan iborat bo'lishi mumkin",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email kiritilishi shart",
    "string.email": "Noto'g'ri email manzili",
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    "string.empty": "Parol kiritilishi shart",
    "string.pattern.base": "Parol kamida 6 ta belgidan iborat bo‘lishi, kamida 1 harf va 1 raqamni o‘z ichiga olishi kerak",
  }),
  role: Joi.string().valid("user", "admin", "warehouse_manager").required().messages({
    "any.only": "Role faqat 'user', 'admin' yoki 'warehouse_manager' bo‘lishi mumkin",
    "any.required": "Role kiritilishi shart",
  }),
  status: Joi.string().valid("active", "inactive").required().messages({
    "any.only": "Status faqat 'active' yoki 'inactive' bo‘lishi mumkin",
    "any.required": "Status kiritilishi shart",
  }),
})


export const updateValidation = Joi.object({
  username: Joi.string().min(3).max(30).optional().messages({
    "string.min": "Username kamida 3 ta belgidan iborat bo'lishi kerak",
    "string.max": "Username maksimal 30 ta belgidan iborat bo'lishi mumkin",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).optional().messages({
    "string.email": "Noto'g'ri email manzili",
  }),
  password: Joi.string().pattern(passwordRegex).optional().messages({
    "string.pattern.base": "Parol kamida 6 ta belgidan iborat bo‘lishi, kamida 1 harf va 1 raqamni o‘z ichiga olishi kerak",
  }),
  role: Joi.string().valid("user", "admin", "warehouse_manager").optional().messages({
    "any.only": "Role faqat 'user', 'admin' yoki 'warehouse_manager' bo‘lishi mumkin",
  }),
  status: Joi.string().valid("active", "inactive").optional().messages({
    "any.only": "Status faqat 'active' yoki 'inactive' bo‘lishi mumkin",
  }),
})

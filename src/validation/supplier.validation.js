import Joi from "joi";

export const createValidation = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Supplier nomi kiritilishi shart",
    "string.min": "Supplier nomi kamida 2 ta belgidan iborat bo'lishi kerak",
    "string.max": "Supplier nomi maksimal 50 ta belgidan iborat bo'lishi mumkin",
  }),
  contact_email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email kiritilishi shart",
    "string.email": "Noto'g'ri email manzili",
  }),
  phone_number: Joi.string().min(5).max(20).required().messages({
    "string.empty": "Telefon raqami kiritilishi shart",
    "string.min": "Telefon raqami kamida 5 ta belgidan iborat bo'lishi kerak",
    "string.max": "Telefon raqami maksimal 20 ta belgidan iborat bo'lishi mumkin",
  }),
  address: Joi.string().min(5).max(200).required().messages({
    "string.empty": "Manzil kiritilishi shart",
    "string.min": "Manzil kamida 5 ta belgidan iborat bo'lishi kerak",
    "string.max": "Manzil maksimal 200 ta belgidan iborat bo'lishi mumkin",
  }),
})

export const updateValidation = Joi.object({
  name: Joi.string().min(2).max(50).optional().messages({
    "string.min": "Supplier nomi kamida 2 ta belgidan iborat bo'lishi kerak",
    "string.max": "Supplier nomi maksimal 50 ta belgidan iborat bo'lishi mumkin",
  }),
  contact_email: Joi.string().email({ tlds: { allow: false } }).optional().messages({
    "string.email": "Noto'g'ri email manzili",
  }),
  phone_number: Joi.string().min(5).max(20).optional().messages({
    "string.min": "Telefon raqami kamida 5 ta belgidan iborat bo'lishi kerak",
    "string.max": "Telefon raqami maksimal 20 ta belgidan iborat bo'lishi mumkin",
  }),
  address: Joi.string().min(5).max(200).optional().messages({
    "string.min": "Manzil kamida 5 ta belgidan iborat bo'lishi kerak",
    "string.max": "Manzil maksimal 200 ta belgidan iborat bo'lishi mumkin",
  }),
})




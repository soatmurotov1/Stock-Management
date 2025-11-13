import Joi from "joi";

export const createValidation = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Kategoriya nomi kiritilishi shart",
    "string.min": "Kategoriya nomi kamida 2 ta belgidan iborat bo'lishi kerak",
    "string.max": "Kategoriya nomi maksimal 50 ta belgidan iborat bo'lishi mumkin",
  }),
  description: Joi.string().min(5).max(500).required().messages({
    "string.empty": "Kategoriya tavsifi kiritilishi shart",
    "string.min": "Kategoriya tavsifi kamida 5 ta belgidan iborat bo'lishi kerak",
    "string.max": "Kategoriya tavsifi maksimal 500 ta belgidan iborat bo'lishi mumkin",
  }),
})


export const updateValidation = Joi.object({
  name: Joi.string().min(2).max(50).optional().messages({
    "string.min": "Kategoriya nomi kamida 2 ta belgidan iborat bo'lishi kerak",
    "string.max": "Kategoriya nomi maksimal 50 ta belgidan iborat bo'lishi mumkin",
  }),
  description: Joi.string().min(5).max(500).optional().messages({
    "string.min": "Kategoriya tavsifi kamida 5 ta belgidan iborat bo'lishi kerak",
    "string.max": "Kategoriya tavsifi maksimal 500 ta belgidan iborat bo'lishi mumkin",
  }),
})




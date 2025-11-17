import Joi from "joi";

export const createValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "name string bo'lishi kerak",
    "any.required": "name majburiy",
    "string.empty": "name majburiy"
  }),
  description: Joi.string().optional(),
  category_id: Joi.string().required().messages({
    "string.base": "categoryId string bo'lishi kerak",
    "any.required": "categoryId majburiy",
    "string.empty": "categoryId majburiy"
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "price raqam bo'lishi kerak",
    "number.positive": "price musbat bo'lishi kerak",
    "any.required": "price majburiy"
  }),
  currency: Joi.string().valid("USD", "EUR", "UZS").required().messages({
    "any.only": "Valyuta faqat USD, EUR, UZS bo'lishi mumkin",
    "any.required": "currency majburiy",
    "string.empty": "currency majburiy"
  }),
  sku: Joi.string().required().messages({
    "string.base": "SKU string bo'lishi kerak",
    "any.required": "SKU majburiy",
    "string.empty": "SKU majburiy"
  }),
  quantity: Joi.number().integer().min(0).required().messages({
    "number.base": "quantity raqam bo'lishi kerak",
    "number.integer": "quantity butun son bo'lishi kerak",
    "number.min": "quantity 0 dan kam bo'lmasligi kerak",
    "any.required": "quantity majburiy"
  })
});

export const updateValidation = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  categoryId: Joi.string().optional(),
  price: Joi.number().positive().optional(),
  currency: Joi.string().valid("USD", "EUR", "UZS").optional(),
  sku: Joi.string().optional(),
  quantity: Joi.number().integer().min(0).optional()
}).min(1).messages({
  "object.min": "Yangilash uchun hech bo'lmasa bitta maydon berilishi shart"
});

import Joi from "joi";


export const createValidation = Joi.object({
  user_id: Joi.string().required().messages({
    "string.empty": "userId majburiy",
    "any.required": "userId majburiy"
  }),
  supplier_id: Joi.string().required().messages({
    "string.empty": "supplierId majburiy",
    "any.required": "supplierId majburiy"
  }),
  status: Joi.string().valid("pending", "completed", "cancelled").required().messages({
    "any.only": "status noto'g'ri",
    "string.empty": "status majburiy",
    "any.required": "status majburiy"
  }),
  currency: Joi.string().valid("USD", "EUR", "UZS").required().messages({
    "any.only": "Valyuta faqat USD, EUR, UZS bo'lishi mumkin",
    "string.empty": "currency majburiy",
    "any.required": "currency majburiy"
  }),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().required().messages({
        "string.empty": "productId majburiy",
        "any.required": "productId majburiy"
      }),
      quantity: Joi.number().integer().min(1).required().messages({
        "number.base": "quantity raqam bo'lishi kerak",
        "number.integer": "quantity butun son bo'lishi kerak",
        "number.min": "quantity 1 dan kam bo'lmasligi kerak",
        "any.required": "quantity majburiy"
      })
    })
  ).min(1).required().messages({
    "array.base": "products array bo'lishi kerak",
    "array.min": "products kamida 1 element bo'lishi kerak",
    "any.required": "products majburiy"
  })
});


export const updateValidation = Joi.object({
  status: Joi.string().valid("pending", "completed", "cancelled").optional().messages({
    "any.only": "status noto'g'ri",
    "string.base": "status string bo'lishi kerak"
  }),
  totalAmount: Joi.number().optional().messages({
    "number.base": "totalAmount raqam bo'lishi kerak"
  }),
  currency: Joi.string().optional().messages({
    "string.base": "currency string bo'lishi kerak"
  }),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().required().messages({
        "any.required": "productId majburiy",
        "string.base": "productId string bo'lishi kerak",
        "string.empty": "productId majburiy"
      }),
      quantity: Joi.number().integer().min(1).required().messages({
        "any.required": "quantity majburiy",
        "number.base": "quantity raqam bo'lishi kerak",
        "number.integer": "quantity butun son bo'lishi kerak",
        "number.min": "quantity 1 dan kam bo'lmasligi kerak"
      })
    })
  ).min(1).optional().messages({
    "array.base": "products array bo'lishi kerak",
    "array.min": "products kamida 1 element bo'lishi kerak"
  })
}).min(1).messages({
  "object.min": "Yangilash uchun hech bo'lmasa bitta maydon berilishi shart"
})

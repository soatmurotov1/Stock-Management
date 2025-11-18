import Joi from "joi";

export const createValidation = Joi.object({
  product_id: Joi.string().uuid().required(),
  quantity: Joi.number().integer().min(0).required(),
  warehouseLocation: Joi.string().required(),
  reorderLevel: Joi.number().integer().min(0).default(10),
  status: Joi.string().valid("in_stock", "out_of_stock", "low_stock").default("out_of_stock"),
});


export const updateValidation = Joi.object({
  quantity: Joi.number().integer().min(0),
  warehouseLocation: Joi.string(),
  reorderLevel: Joi.number().integer().min(0),
  status: Joi.string().valid("in_stock", "out_of_stock", "low_stock").default("out_of_stock"),
});

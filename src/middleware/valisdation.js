import Joi from "joi";

export const validation = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });
  
  if (error) {
    const errors = error.details.map((err) => ({
      path: err.path.join("."),
      message: err.message
    }))

    return res.status(400).json({
      success: false,
      message: "Validation xatosi",
      errors
    })
  }
  req.validatedData = value
  next()
}

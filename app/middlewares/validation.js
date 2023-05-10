const Joi = require("joi");

// Validation schema for user registration
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  validateRegister: (data) => registerSchema.validate(data),
  validateLogin: (data) => loginSchema.validate(data),
};

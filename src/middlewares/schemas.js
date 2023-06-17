const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  image: Joi.string(),
});

module.exports = { createUserSchema };

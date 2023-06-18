const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  image: Joi.string(),
});

const createDeckSchema = Joi.object({
  name: Joi.string().min(3).required(),
  attributeOne: Joi.string().min(3),
  attributeTwo: Joi.string().min(3),
  attributeThree: Joi.string().min(3),
});

const createCardSchema = Joi.object({});

module.exports = { createUserSchema, createCardSchema, createDeckSchema };

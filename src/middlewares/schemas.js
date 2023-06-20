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

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  image: Joi.string(),
});

const createCardSchema = Joi.object({});

module.exports = { createUserSchema, updateUserSchema, createCardSchema, createDeckSchema };

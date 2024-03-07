import Joi from 'joi';

export const addUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
});

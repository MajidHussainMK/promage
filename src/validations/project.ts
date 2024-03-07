import Joi from 'joi';

export const addProjectSchema = Joi.object({
  name: Joi.string().required().min(3),
  details: Joi.string().allow('').optional(),
  description: Joi.string().required(),
  owner: Joi.string().required(),
  manager: Joi.string().required(),
  isRunning: Joi.boolean().optional(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required()
});

export const updateProjectSchema = Joi.object({
  name: Joi.string().min(3),
  details: Joi.string().allow(''),
  description: Joi.string(),
  owner: Joi.string(),
  manager: Joi.string(),
  isRunning: Joi.boolean(),
  startDate: Joi.date(),
  endDate: Joi.date()
});

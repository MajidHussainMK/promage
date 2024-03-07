import Joi from 'joi';

export const addTaskSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  description: Joi.string().required(),
  project: Joi.string().required(),
  status: Joi.string().valid('completed', 'not-started', 'started'),
});

export const updateTaskSchema = Joi.object({
  startDate: Joi.date(),
  endDate: Joi.date(),
  description: Joi.string(),
  project: Joi.string(),
  status: Joi.string().valid('completed', 'not-started', 'started'),
});

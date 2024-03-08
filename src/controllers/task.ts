import express from 'express';
import { Task } from '../models/Task';
import { addTaskSchema, updateTaskSchema } from '../validations/task';
import { StatusCodes } from 'http-status-codes';

export const addTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { startDate, endDate } = req.body;
    const result = addTaskSchema.validate(req.body);
    if (result.error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: result.error.details[0].message });

    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ error: 'start date cannot be before end date' });
    }

    const task = new Task({ ...req.body });
    await task.save();

    return res.json({ task: { _id: task._id } });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { startDate, endDate } = req.body;
    const result = updateTaskSchema.validate(req.body);
    if (result.error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: result.error.details[0].message });

    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ error: 'start date cannot be after end date' });
    }

    const task = await Task.findByIdAndUpdate(
      { _id: req.params.taskId },
      req.body,
      { new: true, select: '-__v' }
    );

    if (!task)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'task with given ID not found' });

    return res.json({ task });
  } catch (err) {
    next(err);
  }
};
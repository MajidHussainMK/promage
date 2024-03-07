import express from 'express';
import { Project } from '../models/Project';
import { addProjectSchema, updateProjectSchema } from '../validations/project';
import { StatusCodes } from 'http-status-codes';
import { Task } from '../models/Task';

export const addProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { startDate, endDate } = req.body;
    const result = addProjectSchema.validate(req.body);
    if (result.error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: result.error.details[0].message });

    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ message: 'start date cannot be before end date' });
    }

    const project = new Project({ ...req.body });
    await project.save();

    return res.json({ project: { _id: project._id } });
  } catch (err) {
    next(err);
  }
};

export const getProjects = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { page = null, limit = null, search } = req.query;
    const skip = Number(page) * Number(limit);

    const query: Record<string, string | Object> = {};
    if (search) {
      query.name = { $regex: new RegExp(search as string, 'i') };
    }

    const projects = await Project.find({ ...query })
      .select(['-__v'])
      .limit(Number(limit))
      .skip(skip);
    const totalCount = await Project.count();

    return res.json({
      page,
      limit,
      count: totalCount,
      projects,
    });
  } catch (err) {
    next(err);
  }
};

export const getProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const project = await Project.findById(req.params.projectId).populate(['owner', 'manager']);
    if (!project)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'project with given ID not found' });

    return res.json({ project });
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { startDate, endDate } = req.body;
    const result = updateProjectSchema.validate(req.body);
    if (result.error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: result.error.details[0].message });

    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ message: 'start date cannot be before end date' });
    }

    const project = await Project.findByIdAndUpdate(
      { _id: req.params.projectId },
      req.body,
      { new: true, select: '-__v' }
    );

    if (!project)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'project with given ID not found' });

    return res.json({ project });
  } catch (err) {
    next(err);
  }
};

export const getProjectTasks = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { page = null, limit = null, search } = req.query;
    const skip = Number(page) * Number(limit);

    const tasks = await Task.find({ project: req.params.projectId })
      .select(['-__v'])
      .limit(Number(limit))
      .skip(skip);
    const totalCount = await Task.count();

    return res.json({
      page,
      limit,
      count: totalCount,
      tasks,
    });
  } catch (err) {
    next(err);
  }
};
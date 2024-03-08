import { Router } from 'express';
import { userRouter } from './user';
import { projectRouter } from './project';
import { taskRouter } from './task';
import { notificationRouter } from './notification';

export const appRoutes = Router();

appRoutes.use('/users', userRouter);
appRoutes.use('/projects', projectRouter);
appRoutes.use('/tasks', taskRouter);
appRoutes.use('/notifications', notificationRouter);

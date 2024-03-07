import { Router } from 'express';
import { userRouter } from './user';
import { projectRouter } from './project';

export const appRoutes = Router();

appRoutes.use('/users', userRouter);
appRoutes.use('/projects', projectRouter);

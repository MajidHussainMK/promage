import { Router } from 'express';
import { userRouter } from './user';

export const appRoutes = Router();

appRoutes.use('/users', userRouter);

import express from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { logger } from '../utils/logger';

export const errorMiddleware = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logger.error(err.message, { traceId: req.headers.traceId });
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  next(err);
};

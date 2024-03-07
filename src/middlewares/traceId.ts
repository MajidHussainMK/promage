import { Request, Response, NextFunction } from 'express';
import { v4 } from 'uuid';
import { logger } from '../utils/logger';

export const traceId = (req: Request, _: Response, next: NextFunction) => {
  if (!req.headers.traceId) {
    req.headers.traceId = v4();
  }
  logger.info(req.url, { traceId: req.headers.traceId });
  next();
};

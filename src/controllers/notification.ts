import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SendNotification } from '../services/send-notification';

export const sendNotification = async (req: Request, res: Response): Promise<Response> => {
  const { recipientId, content } = req.body;
  await new SendNotification().execute({ content, recipientId });

  return res.sendStatus(StatusCodes.NO_CONTENT);
}

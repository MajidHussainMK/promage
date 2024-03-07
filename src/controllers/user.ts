import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/User';
import { addUserSchema, updateUserSchema } from '../validations/user';

export const addUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const result = addUserSchema.validate(req.body);
    if (result.error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: result.error.details[0].message });

    const alreadyExists = await User.findOne({ email: req.body.email });
    if (alreadyExists)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'user already registered' });

    const user = new User({ ...req.body });
    await user.save();

    return res.json({ user: { _id: user._id } });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const result = updateUserSchema.validate(req.body);
    if (result.error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: result.error.details[0].message });

    const user = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { ...req.body },
      {
        new: true,
      }
    );

    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'user with given ID not found' });

    return res.json({ user });
  } catch (err) {
    next(err);
  }
};

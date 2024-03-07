import mongoose, { Document, Model, Schema } from 'mongoose';

export type IUser = Document & {
  firstName: string;
  lastName: string;
  email: string;
};

export type IUserModel = Model<IUser>;

const schema: Schema<IUser> = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please add a valid email address',
    ],
    unique: true,
    lowercase: true,
  },
});

export const User = mongoose.model<IUser, IUserModel>('User', schema);

import mongoose, { Document, Model, Schema } from 'mongoose';

export type IProject = Document & {
  name: string;
  details: string;
  description: string;
  owner: string;
  manager: string;
  isRunning: boolean;
  startDate: Date;
  endDate: Date;
};

export type IProjectModel = Model<IProject>;

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: String,
    default: '',
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isRunning: {
    type: Boolean,
    default: true,
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

export const Project = mongoose.model<IProject, IProjectModel>('Project', schema);

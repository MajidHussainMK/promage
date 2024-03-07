import mongoose, { Document, Model, Schema } from 'mongoose';

export type TaskStatus = 'completed' | 'started' | 'not-started';

export type ITask = Document & {
  startDate: Date;
  endDate: Date;
  description: string;
  status: TaskStatus;
  project: mongoose.Schema.Types.ObjectId;
};

export type ITaskModel = Model<ITask>;

const schema: Schema<ITask> = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'not-started', 'started'],
    default: 'not-started'
  }
}, { timestamps: true });

export const Task = mongoose.model<ITask, ITaskModel>('Task', schema);

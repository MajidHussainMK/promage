import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.info('Connected to MongoDB!');
  } catch (err) {
    console.error(err);
  }
};

import mongoose from 'mongoose';
import { server } from '.';

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(() => {
  server.close();
});

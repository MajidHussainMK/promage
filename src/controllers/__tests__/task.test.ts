import { describe, it } from '@jest/globals';
import mongoose from 'mongoose';
import { Task } from '../../models/Task';
import { dummyMongooseId, post, put } from '../../utils/tests';

const dummyTask = {
  project: dummyMongooseId,
  description: "lorem ipsum do relo",
  startDate: "2024-03-07T11:09:37.160Z",
  endDate: "2024-03-01T11:09:37.160Z",
  status: 'completed'
}

it('tests tasks routes', () => {
  expect(true).toBe(true);
});

describe('/tasks', () => {
  afterEach(async () => {
    await Task.deleteMany({});
  });

  const addTask = (body: Record<string, any> = {}) =>
    post('/tasks', body);

  const updateTask = (
    id: mongoose.Types.ObjectId,
    body: Record<string, any> = {}
  ) => put(`/tasks/${id}`, body);

  describe('POST /', () => {
    it('should return 400 if req.body is not defined', async () => {
      const result = await addTask();

      expect(result.status).toBe(400);
    });
  });

  describe('POST /', () => {
    it('should return 200 and add task', async () => {
      const result = await addTask({ ...dummyTask, startDate: new Date(), endDate: new Date() });

      expect(result.status).toBe(200);
      expect(result.body.task).toHaveProperty('_id');
    });
  });

  describe('POST /', () => {
    it('should return 400 if project is not passed', async () => {
      const { project, ...payload } = dummyTask;
      const result = await addTask(payload);

      expect(result.status).toBe(400);
      expect(result.body.error).toMatch(/"project" is required/);
    });
  });

  describe('POST /', () => {
    it('should return 400 if start date is after end date', async () => {
      const result = await addTask({ ...dummyTask, startDate: new Date().toString() });

      expect(result.status).toBe(400);
      expect(result.body.error).toMatch(/start date cannot be before end date/);
    });
  });

  describe('PUT /:taskId', () => {
    it('should return 404 if we try to update a task that does not exists', async () => {
      const result = await updateTask(dummyMongooseId);

      expect(result.status).toBe(404);
      expect(result.body.error).toMatch(/not found/);
    });
  });

  describe('PUT /:taskId', () => {
    it('should return 200 and update task', async () => {
      const { task } = (await addTask({ ...dummyTask, startDate: new Date(), endDate: new Date() })).body;
      const payload = { description: 'new task' };
      const result = await updateTask(task._id, payload);

      expect(result.status).toBe(200);
      expect(result.body.task).toMatchObject(payload);
    });
  });
});
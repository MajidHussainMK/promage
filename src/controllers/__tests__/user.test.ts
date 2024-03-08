import { describe, it } from '@jest/globals';
import mongoose from 'mongoose';
import { User } from '../../models/User';
import { dummyMongooseId, post, put } from '../../utils/tests';

const dummyUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john@gmail.com"
}

it('tests users routes', () => {
  expect(true).toBe(true);
});

describe('/users', () => {
  afterEach(async () => {
    await User.deleteMany({});
  });

  const addUser = (body: Record<string, any> = {}) =>
    post('/users', body);

  const updateUser = (
    id: mongoose.Types.ObjectId,
    body: Record<string, any> = {}
  ) => put(`/users/${id}`, body);

  describe('POST /', () => {
    it('should return 400 if req.body is not defined', async () => {
      const result = await addUser();

      expect(result.status).toBe(400);
      expect(result.body.error).toMatch(/"firstName" is required/);
    });
  });

  describe('POST /', () => {
    it('should return 200 and add user', async () => {
      const result = await addUser(dummyUser);

      expect(result.status).toBe(200);
      expect(result.body.user).toHaveProperty('_id');
    });
  });

  describe('POST /', () => {
    it('should return 400 if we try to add a user with an already used email', async () => {
      await addUser(dummyUser);
      const result = await addUser(dummyUser);

      expect(result.status).toBe(400);
      expect(result.body.error).toMatch(/user already registered/);

    });
  });

  describe('PUT /:userId', () => {
    it('should return 404 if we try to update a user that does not exists', async () => {
      const result = await updateUser(dummyMongooseId);

      expect(result.status).toBe(404);
      expect(result.body.error).toMatch(/user with given ID not found/);
    });
  });

  describe('PUT /:userId', () => {
    it('should return 200 and update user', async () => {
      const { user } = (await addUser(dummyUser)).body;
      const payload = { firstName: 'Jane', lastName: 'Doe' };
      const result = await updateUser(user._id, payload);

      expect(result.status).toBe(200);
      expect(result.body.user).toMatchObject(payload);
    });
  });
});
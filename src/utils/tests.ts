import request from 'supertest';
import mongoose from 'mongoose';
import { server } from '..';

export const dummyMongooseId = new mongoose.Types.ObjectId();

export const post = (
  url: string = '',
  body: Record<string, any> = {},
) => request(server).post(url).send(body);

export const put = (
  url: string = '',
  body: Record<string, any> = {},
) => request(server).put(url).send(body);

export const deleteApi = (
  url: string = '',
) => request(server).delete(url);

export const get = (
  url: string = '',
  queryParams: string = '',
) => request(server).get(`${url}?${queryParams}`);

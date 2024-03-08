import { describe, it } from '@jest/globals';
import mongoose from 'mongoose';
import { Project } from '../../models/Project';
import { dummyMongooseId, get, post, put } from '../../utils/tests';

const dummyProject = {
  owner: dummyMongooseId,
  manager: dummyMongooseId,
  name: "Project 1",
  description: "lorem ipsum do relo",
  startDate: "2024-03-07T11:09:37.160Z",
  endDate: "2024-03-08T11:09:37.160Z"
}

it('tests projects routes', () => {
  expect(true).toBe(true);
});

describe('/projects', () => {
  afterEach(async () => {
    await Project.deleteMany({});
  });

  const addProject = (body: Record<string, any> = {}) =>
    post('/projects', body);

  const getProjects = (queryParams: string = '') =>
    get('/projects', queryParams);

  const getProject = (id: mongoose.Types.ObjectId) =>
    get(`/projects/${id}`, '');

  const updateProject = (
    id: mongoose.Types.ObjectId,
    body: Record<string, any> = {}
  ) => put(`/projects/${id}`, body);

  describe('GET /', () => {
    it('should return all projects without pagination', async () => {
      const result = await getProjects();

      expect(result.status).toBe(200);
      expect(result.body).toMatchObject({
        page: null,
        limit: null,
        count: 0,
        projects: [],
      });
    });
  });

  describe('GET /', () => {
    it('should return paginated projects', async () => {
      const result = await getProjects('page=0&limit=10');

      expect(result.status).toBe(200);
      expect(result.body).toMatchObject({
        page: '0',
        limit: '10',
        count: 0,
        projects: [],
      });
    });
  });

  describe('GET /', () => {
    it('should return correct projects as per search param', async () => {
      await addProject({ ...dummyProject, name: 'P 01' });
      await addProject({ ...dummyProject, name: 'P 02' });
      await addProject({ ...dummyProject, name: 'P 03' });
      const result = await getProjects('page=0&limit=10&search=P 01');

      expect(result.status).toBe(200);
      expect(result.body.projects).toHaveLength(1);
      expect(result.body.projects[0].name).toBe('P 01');
    });
  });

  describe('GET /:projectId', () => {
    it('should return 404 if we try to fetch a non existent project', async () => {
      const result = await getProject(dummyMongooseId);

      expect(result.status).toBe(404);
      expect(result.body.error).toMatch(/not found/);
    });
  });

  describe('GET /:projectId', () => {
    it('should return 200 if we fetch an project by id', async () => {
      const { project } = (await addProject({ ...dummyProject, name: 'P 01' })).body;
      const result = await getProject(project._id);

      expect(result.status).toBe(200);
      expect(result.body.project).toBeDefined();
      expect(result.body.project).toHaveProperty('_id');
      expect(result.body.project).toHaveProperty('name');
      expect(result.body.project).toHaveProperty('description');
      expect(result.body.project).toMatchObject({ _id: project._id });
    });
  });

  describe('POST /', () => {
    it('should return 400 if req.body is not defined', async () => {
      const result = await addProject();

      expect(result.status).toBe(400);
      expect(result.body.error).toMatch(/"name" is required/);
    });
  });

  describe('POST /', () => {
    it('should return 200 and add project', async () => {
      const result = await addProject({ ...dummyProject, name: 'P 01' });

      expect(result.status).toBe(200);
      expect(result.body.project).toHaveProperty('_id');
    });
  });

  describe('PUT /:projectId', () => {
    it('should return 404 if we try to update an project that does not exists', async () => {
      const result = await updateProject(dummyMongooseId);

      expect(result.status).toBe(404);
      expect(result.body.error).toMatch(/not found/);
    });
  });

  describe('PUT /:projectId', () => {
    it('should return 200 and update project', async () => {
      const { project } = (await addProject({ ...dummyProject, name: 'P 01' })).body;
      const payload = { name: 'P 02', description: 'new project' };
      const result = await updateProject(project._id, payload);

      expect(result.status).toBe(200);
      expect(result.body.project).toMatchObject(payload);
    });
  });
});
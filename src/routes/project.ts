import { Router } from 'express';
import { addProject, getProject, getProjectTasks, getProjects, updateProject } from '../controllers/project';

const router = Router();

router.post('/', addProject);
router.get('/:projectId', getProject);
router.get('/', getProjects);
router.put('/:projectId', updateProject);
router.get('/:projectId/tasks', getProjectTasks);

export const projectRouter = router;

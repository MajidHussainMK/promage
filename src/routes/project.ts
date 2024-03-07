import { Router } from 'express';
import { addProject, getProject, getProjects, updateProject } from '../controllers/project';

const router = Router();

router.post('/', addProject);
router.get('/:projectId', getProject);
router.get('/', getProjects);
router.put('/:projectId', updateProject);

export const projectRouter = router;

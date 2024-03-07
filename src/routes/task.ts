import { Router } from 'express';
import { addTask, updateTask } from '../controllers/task';

const router = Router();

router.post('/', addTask);
router.put('/:taskId', updateTask);

export const taskRouter = router;

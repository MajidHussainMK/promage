import { Router } from 'express';
import { addUser, updateUser } from '../controllers/user';

const router = Router();

router.post('/', addUser);
router.put('/:userId', updateUser);

export const userRouter = router;

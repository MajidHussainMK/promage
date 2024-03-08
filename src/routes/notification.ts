import { Router } from 'express';
import { sendNotification } from '../controllers/notification';

const router = Router();

router.post('/', sendNotification);

export const notificationRouter = router;

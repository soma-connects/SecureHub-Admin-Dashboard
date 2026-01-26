import { Router } from 'express';
import * as notificationController from '../controllers/notificationController';

const router = Router();

router.get('/', notificationController.getNotifications);
router.patch('/read-all', notificationController.markAllRead);
router.delete('/read', notificationController.clearRead);

export default router;

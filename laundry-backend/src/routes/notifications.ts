import { Router } from 'express';
import * as notificationController from '../controllers/notificationController';
import { protect } from '../middlewares/authMiddleware';


const router = Router();

router.use(protect);

router.get('/', notificationController.getNotifications);
router.patch('/read-all', notificationController.markAllRead);
router.delete('/read', notificationController.clearRead);

export default router;

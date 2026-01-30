import { Router } from 'express';
import * as analyticsController from '../controllers/analyticsController';
import { protect } from '../middlewares/authMiddleware';


const router = Router();

router.use(protect);

router.get('/stats', analyticsController.getAnalytics);

export default router;

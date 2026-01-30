import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { protect } from '../middlewares/authMiddleware';


const router = Router();

router.use(protect);

router.get('/', orderController.getOrders);
router.patch('/:id/status', orderController.updateStatus);
router.delete('/:id', orderController.deleteOrder);

export default router;

import { Router } from 'express';
import * as orderController from '../controllers/orderController';

const router = Router();

router.get('/', orderController.getOrders);
router.patch('/:id/status', orderController.updateStatus);

export default router;

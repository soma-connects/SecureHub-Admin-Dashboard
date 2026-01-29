import { Router } from 'express';
import * as customerController from '../controllers/customerController';

const router = Router();

router.get('/', customerController.getCustomers);
router.get('/:id', customerController.getCustomer);
router.patch('/:id/status', customerController.updateStatus);
router.delete('/:id', customerController.deleteCustomer);

export default router;

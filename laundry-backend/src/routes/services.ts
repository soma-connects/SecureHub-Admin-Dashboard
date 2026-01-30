import { Router } from 'express';
import * as serviceController from '../controllers/serviceController';
import { protect } from '../middlewares/authMiddleware';


const router = Router();

router.use(protect);

router.get('/', serviceController.getServices);
router.post('/', serviceController.createService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

export default router;

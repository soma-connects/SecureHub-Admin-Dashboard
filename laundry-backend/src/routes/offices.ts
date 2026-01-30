import { Router } from 'express';
import * as officeController from '../controllers/officeController';
import { protect } from '../middlewares/authMiddleware';


const router = Router();

router.use(protect);

router.get('/stats', officeController.getStats);
router.get('/', officeController.getOffices);
router.post('/', officeController.createOffice);
router.put('/:id', officeController.updateOffice);
router.delete('/:id', officeController.deleteOffice);

export default router;

import { Router } from 'express';
import * as officeController from '../controllers/officeController';

const router = Router();

router.get('/', officeController.getOffices);

export default router;

import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as serviceService from '../services/serviceService';

export const getServices = asyncHandler(async (req: Request, res: Response) => {
    const services = await serviceService.getAllServices();
    res.status(200).json(services);
});

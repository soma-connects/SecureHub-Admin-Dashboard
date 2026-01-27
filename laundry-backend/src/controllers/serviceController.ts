import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as serviceService from '../services/serviceService';

export const getServices = asyncHandler(async (req: Request, res: Response) => {
    const services = await serviceService.getAllServices();
    res.status(200).json(services);
});

export const createService = asyncHandler(async (req: Request, res: Response) => {
    const service = await serviceService.createService(req.body);
    res.status(201).json(service);
});

export const updateService = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const service = await serviceService.updateService(id, req.body);
    res.status(200).json(service);
});

export const deleteService = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    await serviceService.deleteService(id);
    res.status(204).send();
});

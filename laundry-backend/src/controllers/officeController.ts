import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as officeService from '../services/officeService';

export const getOffices = asyncHandler(async (req: Request, res: Response) => {
    const offices = await officeService.getAllOffices();
    res.status(200).json(offices);
});

export const createOffice = asyncHandler(async (req: Request, res: Response) => {
    const office = await officeService.createOffice(req.body);
    res.status(201).json(office);
});

export const updateOffice = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const office = await officeService.updateOffice(id, req.body);
    res.status(200).json(office);
});

export const deleteOffice = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    await officeService.deleteOffice(id);
    res.status(204).send();
});

export const getStats = asyncHandler(async (req: Request, res: Response) => {
    const stats = await officeService.getOfficeStats();
    res.status(200).json(stats);
});

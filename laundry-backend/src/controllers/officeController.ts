import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as officeService from '../services/officeService';

export const getOffices = asyncHandler(async (req: Request, res: Response) => {
    const offices = await officeService.getAllOffices();
    res.status(200).json(offices);
});

import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as analyticsService from '../services/analyticsService';
import { AppError } from '../utils/AppError';

export const getAnalytics = asyncHandler(async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        throw new AppError('startDate and endDate are required', 400);
    }

    const stats = await analyticsService.getStats(startDate as string, endDate as string);
    res.status(200).json(stats);
});

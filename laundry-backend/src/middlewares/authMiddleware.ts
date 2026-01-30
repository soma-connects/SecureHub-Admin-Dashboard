import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { AppError } from '../utils/AppError';

export interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // 1. Get token from header
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('You are not logged in! Please log in to get access.', 401));
        }

        // 2. Verify token
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return next(new AppError('The user belonging to this token does no longer exist.', 401));
        }

        // 3. Grant access
        req.user = user;
        next();
    } catch (error) {
        next(new AppError('Authentication failed', 401));
    }
};

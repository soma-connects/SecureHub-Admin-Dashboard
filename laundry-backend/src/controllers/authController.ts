import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/AppError';

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Email and password are required', 400));
    }

    // Authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return next(new AppError(error.message, 401));
    }

    if (!data.user || !data.session) {
        return next(new AppError('Authentication failed', 401));
    }

    // Get additional user info from 'users' table if needed
    const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

    res.json({
        success: true,
        user: {
            id: data.user.id,
            email: data.user.email,
            name: userProfile?.name || data.user.user_metadata?.name || 'User',
            role: userProfile?.role || 'user'
        },
        token: data.session.access_token
    });
});

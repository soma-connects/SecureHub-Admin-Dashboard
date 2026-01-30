import { supabase } from '../config/supabase';
import { AppError } from '../utils/AppError';

export const getAllNotifications = async () => {
    try {
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            // Check if error is due to missing table
            if (error.code === '42P01') { // undefined_table
                console.warn('Notifications table missing, returning empty list');
                return [];
            }
            throw new AppError(error.message, 500);
        }

        return data;
    } catch (err: any) {
        if (err.message?.includes('relation "notifications" does not exist')) {
            return [];
        }
        throw new AppError('Failed to fetch notifications', 500);
    }
};

export const markAllAsRead = async () => {
    const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true }) // Assuming 'is_read' column. If 'read', change accordingly.
        .eq('is_read', false)
        .select();

    if (error) {
        throw new AppError(error.message, 500);
    }

    return data;
};

export const clearReadNotifications = async () => {
    const { data, error } = await supabase
        .from('notifications')
        .delete()
        .eq('is_read', true)
        .select();

    if (error) {
        throw new AppError(error.message, 500);
    }

    return data;
};

import { supabase } from '../config/supabase';
import { AppError } from '../utils/AppError';

export const getAllNotifications = async () => {
    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw new AppError(error.message, 500);
    }

    return data;
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

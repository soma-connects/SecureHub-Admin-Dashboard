import { supabase } from '../config/supabase';
import { AppError } from '../utils/AppError';

export const getAllServices = async () => {
    const { data, error } = await supabase
        .from('services')
        .select('*');

    if (error) {
        throw new AppError(error.message, 500);
    }

    return data;
};

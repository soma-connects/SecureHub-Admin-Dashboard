import { supabase } from '../config/supabase';
import { AppError } from '../utils/AppError';

export const getAllOffices = async () => {
    const { data, error } = await supabase
        .from('offices')
        .select('*');

    if (error) {
        throw new AppError(error.message, 500);
    }

    return data;
};

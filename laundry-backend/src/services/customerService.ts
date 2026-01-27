import { supabase } from '../config/supabase';
import { AppError } from '../utils/AppError';

export const getAllCustomers = async () => {
    const { data, error } = await supabase
        .from('users') // 'users' table stores customer data
        .select('*');

    if (error) {
        throw new AppError(error.message, 500);
    }

    return data;
};

export const deleteCustomer = async (id: string) => {
    const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

    if (error) {
        throw new AppError(error.message, 500);
    }
};

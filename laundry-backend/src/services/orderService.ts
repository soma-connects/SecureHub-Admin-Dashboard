import { supabase } from '../config/supabase';
import { AppError } from '../utils/AppError';

export const getAllOrders = async () => {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            customer:customers (
                name,
                email,
                phone,
                address
            ),
            service:services (
                name,
                category
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        throw new AppError(error.message, 500);
    }

    return data;
};

export const updateOrderStatus = async (id: string, status: string) => {
    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw new AppError(error.message, 500);
    }

    if (!data) {
        throw new AppError('Order not found', 404);
    }

    return data;
};

export const deleteOrder = async (id: string) => {
    const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

    if (error) {
        throw new AppError(error.message, 500);
    }
};

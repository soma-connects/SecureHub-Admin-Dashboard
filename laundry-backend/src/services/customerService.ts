import { supabase } from '../config/supabase';
import { AppError } from '../utils/AppError';

export const getAllCustomers = async () => {
    const { data, error } = await supabase
        .from('customers')
        .select('*');

    if (error) {
        throw new AppError(error.message, 500);
    }

    return data;
};

export const deleteCustomer = async (id: string) => {
    const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);

    if (error) {
        throw new AppError(error.message, 500);
    }
};

export const getCustomerById = async (id: string) => {
    // 1. Fetch Customer Profile
    const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

    if (customerError) {
        throw new AppError(customerError.message, 404);
    }

    // 2. Fetch Recent Orders for this customer
    const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select(`
            id,
            created_at,
            amount,
            status,
            service:services(name)
        `)
        .eq('customer_id', id)
        .order('created_at', { ascending: false })
        .limit(10); // Limit to last 10 orders

    if (ordersError) {
        console.error('Error fetching customer orders:', ordersError);
        // Don't fail the whole request, just return empty orders
    }

    return {
        ...customer,
        recentOrders: orders || []
    };
};

export const updateCustomerStatus = async (id: string, status: 'Active' | 'Suspended') => {
    const { error } = await supabase
        .from('customers')
        .update({ status })
        .eq('id', id);

    if (error) {
        throw new AppError(error.message, 500);
    }
};

import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

// Get all orders
router.get('/', async (req: Request, res: Response) => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    // Map flat Supabase structure to nested frontend structure
    const mappedData = data.map((order: any) => ({
        id: order.id,
        customer: {
            name: order.customer_name,
            email: order.customer_email,
            phone: order.customer_phone,
            address: order.customer_address
        },
        service: {
            name: order.service_name,
            items: order.service_items,
            category: order.service_category
        },
        date: {
            pickup: order.pickup_date,
            delivery: order.delivery_date
        },
        amount: order.amount,
        status: order.status,
        payment: order.payment
    }));

    res.json(mappedData);
});

// Update order status
router.patch('/:id/status', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data) {
        return res.status(404).json({ message: 'Order not found' });
    }

    res.json(data);
});

export default router;

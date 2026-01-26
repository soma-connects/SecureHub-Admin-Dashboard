import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as orderService from '../services/orderService';
import { updateOrderStatusSchema } from '../schemas/orderSchema';
import { AppError } from '../utils/AppError';

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
    const rawOrders = await orderService.getAllOrders();

    // Map flat Supabase structure to nested frontend structure
    const orders = rawOrders.map((order: any) => ({
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

    res.status(200).json(orders);
});

export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const result = updateOrderStatusSchema.safeParse(req.body);

    if (!result.success) {
        // Use issues array which is definitely present on ZodError
        throw new AppError(result.error.issues[0].message, 400);
    }

    const { status } = result.data;
    const updatedOrder = await orderService.updateOrderStatus(id, status);

    res.status(200).json(updatedOrder);
});

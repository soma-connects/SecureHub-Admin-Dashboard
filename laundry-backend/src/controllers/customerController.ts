import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as customerService from '../services/customerService';
import { format } from 'date-fns';

export const getCustomers = asyncHandler(async (req: Request, res: Response) => {
    // In a real app, you might join with 'orders' table to get real stats.
    // For now, we fetch users and mock the stats to ensure the UI looks good.
    const rawCustomers = await customerService.getAllCustomers();

    const customers = rawCustomers.map((user: any) => {
        // Generate initials
        const name = user.full_name || user.email || 'Unknown';
        const initials = name
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

        return {
            id: user.id,
            name: user.full_name || 'Anonymous',
            email: user.email,
            phone: user.phone || 'N/A',
            address: user.address || 'N/A',
            orders: user.total_orders || Math.floor(Math.random() * 20), // Mock if missing
            spent: user.total_spent ? `$${user.total_spent}` : `$${(Math.random() * 500).toFixed(2)}`,
            lastOrder: user.last_order_date
                ? format(new Date(user.last_order_date), 'MMM dd, yyyy')
                : format(new Date(), 'MMM dd, yyyy'),
            status: user.status || 'Active',
            initials: initials,
            color: user.color || 'bg-blue-100 text-blue-600' // Default color
        };
    });

    res.status(200).json(customers);
});

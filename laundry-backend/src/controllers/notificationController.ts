import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as notificationService from '../services/notificationService';
import { formatDistanceToNow } from 'date-fns';

export const getNotifications = asyncHandler(async (req: Request, res: Response) => {
    const rawNotifications = await notificationService.getAllNotifications();

    // Create a safe mapping that handles potential differences in DB schema vs mock data
    const notifications = rawNotifications.map((n: any) => ({
        id: n.id,
        type: n.type,
        title: n.title,
        priority: n.priority,
        message: n.message,
        orderId: n.order_id || n.orderId, // Support both cases
        customer: n.customer_name || n.customer,
        amount: n.amount,
        timeAgo: n.created_at ? formatDistanceToNow(new Date(n.created_at), { addSuffix: true }) : 'Just now',
        isUnread: n.is_read !== undefined ? !n.is_read : (n.isUnread !== undefined ? n.isUnread : true)
    }));

    res.status(200).json({
        status: 'success',
        data: {
            notifications
        }
    });
});

export const markAllRead = asyncHandler(async (req: Request, res: Response) => {
    await notificationService.markAllAsRead();
    res.status(200).json({
        status: 'success',
        message: 'All notifications marked as read'
    });
});

export const clearRead = asyncHandler(async (req: Request, res: Response) => {
    await notificationService.clearReadNotifications();
    res.status(204).json({
        status: 'success',
        data: null
    });
});

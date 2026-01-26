import { z } from 'zod';

export const updateOrderStatusSchema = z.object({
    status: z.enum(['Pending', 'Processing', 'Ready', 'Completed', 'Cancelled']),
});

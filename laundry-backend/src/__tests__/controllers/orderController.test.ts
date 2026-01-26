import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../app';
import * as orderService from '../../services/orderService';
import { AppError } from '../../utils/AppError';

// Mock the Service layer to isolate Controller tests
vi.mock('../../services/orderService', () => ({
    getAllOrders: vi.fn(),
    updateOrderStatus: vi.fn()
}));

describe('OrderController', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('PATCH /api/orders/:id/status', () => {
        it('should return 200 and updated order when input is valid', async () => {
            const mockOrder = { id: '123', status: 'Completed' };
            // vi.mocked helper or casting
            (orderService.updateOrderStatus as any).mockResolvedValue(mockOrder);

            const res = await request(app)
                .patch('/api/orders/123/status')
                .send({ status: 'Completed' });

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockOrder);
            expect(orderService.updateOrderStatus).toHaveBeenCalledWith('123', 'Completed');
        });

        it('should return 400 when status is invalid (Zod Validation)', async () => {
            const res = await request(app)
                .patch('/api/orders/123/status')
                .send({ status: 'InvalidStatus' });

            expect(res.status).toBe(400);
            // Optional: check error message structure if desired
            // expect(res.body.error).toContain('Invalid enum value');
        });

        it('should return 400 when status is missing', async () => {
            const res = await request(app)
                .patch('/api/orders/123/status')
                .send({});

            expect(res.status).toBe(400);
        });
    });
});

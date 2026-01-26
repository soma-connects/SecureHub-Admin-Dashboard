import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllNotifications, markAllAsRead, clearReadNotifications } from '../../services/notificationService';
import { supabase } from '../../config/supabase';
import { AppError } from '../../utils/AppError';

// The supabase import here will be the MOCK version because of setup.ts or manual imports
// We need to cast it to `any` or a Mock type to access `.mockResolvedValue`
const mockSupabase = supabase as any;

describe('NotificationService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAllNotifications', () => {
        it('should return a list of notifications', async () => {
            const mockData = [{ id: 1, message: 'Test' }];

            // Mock the chain: from -> select -> order -> { data, error }
            const mockChain = {
                select: vi.fn().mockReturnThis(),
                order: vi.fn().mockResolvedValue({ data: mockData, error: null })
            };
            mockSupabase.from.mockReturnValue(mockChain);

            const result = await getAllNotifications();

            expect(mockSupabase.from).toHaveBeenCalledWith('notifications');
            expect(mockChain.select).toHaveBeenCalledWith('*');
            expect(result).toEqual(mockData);
        });

        it('should throw AppError on DB error', async () => {
            const mockError = { message: 'DB Error' };
            const mockChain = {
                select: vi.fn().mockReturnThis(),
                order: vi.fn().mockResolvedValue({ data: null, error: mockError })
            };
            mockSupabase.from.mockReturnValue(mockChain);

            await expect(getAllNotifications()).rejects.toThrow(AppError);
        });
    });

    describe('markAllAsRead', () => {
        it('should update unread notifications', async () => {
            const mockChain = {
                update: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                select: vi.fn().mockResolvedValue({ data: [], error: null })
            };
            mockSupabase.from.mockReturnValue(mockChain);

            await markAllAsRead();

            expect(mockSupabase.from).toHaveBeenCalledWith('notifications');
            expect(mockChain.update).toHaveBeenCalledWith({ is_read: true });
            expect(mockChain.eq).toHaveBeenCalledWith('is_read', false);
        });
    });

    describe('clearReadNotifications', () => {
        it('should delete read notifications', async () => {
            const mockChain = {
                delete: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                select: vi.fn().mockResolvedValue({ data: [], error: null })
            };
            mockSupabase.from.mockReturnValue(mockChain);

            await clearReadNotifications();

            expect(mockSupabase.from).toHaveBeenCalledWith('notifications');
            expect(mockChain.delete).toHaveBeenCalled();
            expect(mockChain.eq).toHaveBeenCalledWith('is_read', true);
        });
    });
});

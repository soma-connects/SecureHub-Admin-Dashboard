import { vi } from 'vitest';

// Mock Supabase globally
vi.mock('../config/supabase', () => {
    return {
        supabase: {
            from: vi.fn(),
        },
    };
});

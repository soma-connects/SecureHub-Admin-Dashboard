import { z } from 'zod';

export const customerSchema = z.object({
    // Add validation rules as needed for create/update
    // For now, since we only have GET, this might be empty or used for query params
});

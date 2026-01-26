import { z } from 'zod';

export const markReadSchema = z.object({
    ids: z.array(z.string()).optional(), // Optional: if provided, mark specific ones. If not, logic might differ.
    all: z.boolean().optional(),
});

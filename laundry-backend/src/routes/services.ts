import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

// Get all services
router.get('/', async (req: Request, res: Response) => {
    const { data, error } = await supabase
        .from('services')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

export default router;

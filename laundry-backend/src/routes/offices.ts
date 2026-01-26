import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

// Get all offices
router.get('/', async (req: Request, res: Response) => {
    const { data, error } = await supabase
        .from('offices')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

export default router;

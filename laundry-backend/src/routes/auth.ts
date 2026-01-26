import { Router, Request, Response } from 'express';
import { users } from '../data/store';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // In a real app, return a JWT token here
        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token: 'mock-jwt-token-12345'
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

export default router;

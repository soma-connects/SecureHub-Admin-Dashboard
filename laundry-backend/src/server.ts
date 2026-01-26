import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import orderRoutes from './routes/orders';
import analyticsRoutes from './routes/analytics';
import customerRoutes from './routes/customers';
import serviceRoutes from './routes/services';
import officeRoutes from './routes/offices';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Port 3001 to avoid conflict with frontend (3000) or Vite (5173)

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/offices', officeRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
    res.send('Laundry Dashboard API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

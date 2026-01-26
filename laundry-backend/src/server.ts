import { app } from './app';

const PORT = process.env.PORT || 3001; // Port 3001 to avoid conflict with frontend (3000) or Vite (5173)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

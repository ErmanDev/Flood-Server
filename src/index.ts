import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createConnection from './config/db';
import { initTables } from './config/initTables';
import authRoutes from './routes/auth';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Initialize database connection and tables
createConnection();
initTables().catch((error: any) => {
  console.error('Failed to initialize database:', error);
});

// Authentication and User Management routes only
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Flood Server is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

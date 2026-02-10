import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';
import logsRoutes from './routes/logs';
import pinnedAreaRoutes from './routes/pinnedAreas';
import sensorRoutes from './routes/sensorReadings';
import dashboardRoutes from './routes/dashboard';
import healthRoutes from './routes/health';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api/pinned-areas', pinnedAreaRoutes);
app.use('/api/sensor-readings', sensorRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Flood Server is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

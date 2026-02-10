
import express from 'express';
import { getSensorReadings, getLatestSensorReading } from '../controllers/sensorController';

const router = express.Router();

router.get('/', getSensorReadings);
router.get('/latest', getLatestSensorReading);

export default router;

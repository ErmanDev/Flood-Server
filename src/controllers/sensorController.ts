
import { Request, Response } from 'express';
import SensorReading from '../models/SensorReading';

export const getSensorReadings = async (req: Request, res: Response) => {
    try {
        const readings = await SensorReading.find({}, { limit: 50 });
        res.json({ readings });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getLatestSensorReading = async (req: Request, res: Response) => {
    try {
        const reading = await SensorReading.findOne();
        res.json(reading || null);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

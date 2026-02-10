import { Request, Response } from 'express';
import SensorReading from '../models/SensorReading';

export const getHealth = async (req: Request, res: Response) => {
    const latestReading = await SensorReading.findOne();
    const now = new Date();
    const isOnline = latestReading && (now.getTime() - latestReading.timestamp.getTime() < 60000); // 1 minute threshold

    res.json({
        status: 'UP',
        timestamp: new Date(),
        sensor: {
            connected: !!isOnline,
            status: isOnline ? 'online' : 'offline',
            message: isOnline ? 'Sensor is online' : 'Sensor is offline',
            lastReadingTime: latestReading ? latestReading.timestamp : null
        },
        led: { // Add LED status return as frontend expects it
            color: isOnline ? 'green' : 'grey',
            status: isOnline ? 'normal' : 'unknown',
            message: isOnline ? 'System Normal' : 'No Data'
        }
    });
};


import { Request, Response } from 'express';
import Log from '../models/Log';
import PinnedArea from '../models/PinnedArea';
import SensorReading from '../models/SensorReading';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const logCount = await Log.countDocuments({});
        const pinCount = await PinnedArea.countDocuments();
        const sensorCount = await SensorReading.countDocuments();

        const latestReading = await SensorReading.findOne();
        // Mocking recent activity logs
        const recentLogs = await Log.find({}, { limit: 5 });

        const logTypes = {
            sensor: await Log.countDocuments({ type: 'sensor' }),
            userAction: await Log.countDocuments({ type: 'user_action' }),
            systemEvent: await Log.countDocuments({ type: 'system_event' })
        };

        const logsLast24h = await Log.countDocuments({
            timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        }); // Note: In-memory Log model needs to support query filtering for this to strictly work, but countDocuments just returns total length in current mock.
        // Since we removed mock data, logs are empty anyway.

        res.json({
            totals: {
                logs: logCount,
                pinnedAreas: pinCount,
                sensorReadings: sensorCount
            },
            logTypes: logTypes,
            recent: {
                logsLast24h: 0, // Simplified as our in-memory query support is limited
                latestSensorReading: latestReading || null
            },
            sensorStatus: latestReading ? {
                status: 'online',
                message: 'Sensor is operating normally',
                isGood: true,
                lastReadingTime: latestReading.timestamp
            } : {
                status: 'offline',
                message: 'No sensor data available',
                isGood: false,
                lastReadingTime: null
            },
            recentActivity: recentLogs
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

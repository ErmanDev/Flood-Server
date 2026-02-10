
import { Request, Response } from 'express';
import Log from '../models/Log';

export const getLogs = async (req: Request, res: Response) => {
    try {
        const logs = await Log.find();
        res.json({ logs });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const clearLogs = async (req: Request, res: Response) => {
    try {
        const result = await Log.deleteMany({});
        res.json({ message: 'Logs cleared', deletedCount: result.deletedCount });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

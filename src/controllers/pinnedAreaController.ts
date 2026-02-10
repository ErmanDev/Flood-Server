
import { Request, Response } from 'express';
import PinnedArea from '../models/PinnedArea';

export const getPinnedAreas = async (req: Request, res: Response) => {
    try {
        const areas = await PinnedArea.find();
        res.json(areas);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createPinnedArea = async (req: Request, res: Response) => {
    try {
        const { latitude, longitude, address, userId } = req.body;
        const area = await PinnedArea.create({ latitude, longitude, address, userId });
        res.status(201).json(area);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePinnedArea = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await PinnedArea.findByIdAndDelete(id);
        res.json({ message: 'Pinned area removed' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

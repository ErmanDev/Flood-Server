import { Request, Response } from 'express';
import User from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        // Return users but exclude passwords and filter out the system admin
        const sanitizedUsers = users
            .filter(user => user.email !== 'admin@gmail.com')
            .map(user => ({
                _id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                address: user.address,
                profileImage: user.profileImage,
                status: user.status
            }));
        res.json(sanitizedUsers);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const validStatuses = ['Verified', 'Pending Verification', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const user = await User.updateStatus(id, status);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User status updated', user: { ...user, status } });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

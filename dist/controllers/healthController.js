"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = void 0;
const getHealth = (req, res) => {
    res.json({
        status: 'UP',
        timestamp: new Date(),
        sensor: {
            connected: true,
            status: 'online',
            message: 'Mock sensor is online',
            lastReadingTime: new Date()
        }
    });
};
exports.getHealth = getHealth;

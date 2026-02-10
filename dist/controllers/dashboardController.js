"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const Log_1 = __importDefault(require("../models/Log"));
const PinnedArea_1 = __importDefault(require("../models/PinnedArea"));
const SensorReading_1 = __importDefault(require("../models/SensorReading"));
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logCount = yield Log_1.default.countDocuments({});
        const pinCount = yield PinnedArea_1.default.countDocuments();
        const sensorCount = yield SensorReading_1.default.countDocuments();
        const latestReading = yield SensorReading_1.default.findOne();
        // Mocking recent activity logs
        const recentLogs = yield Log_1.default.find({}, { limit: 5 });
        const logTypes = {
            sensor: yield Log_1.default.countDocuments({ type: 'sensor' }),
            userAction: yield Log_1.default.countDocuments({ type: 'user_action' }),
            systemEvent: yield Log_1.default.countDocuments({ type: 'system_event' })
        };
        const logsLast24h = yield Log_1.default.countDocuments({
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getDashboardStats = getDashboardStats;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sensorController_1 = require("../controllers/sensorController");
const router = express_1.default.Router();
router.get('/', sensorController_1.getSensorReadings);
router.get('/latest', sensorController_1.getLatestSensorReading);
exports.default = router;

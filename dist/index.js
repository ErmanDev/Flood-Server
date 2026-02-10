"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const logs_1 = __importDefault(require("./routes/logs"));
const pinnedAreas_1 = __importDefault(require("./routes/pinnedAreas"));
const sensorReadings_1 = __importDefault(require("./routes/sensorReadings"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const health_1 = __importDefault(require("./routes/health"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/auth', auth_1.default);
app.use('/api/logs', logs_1.default);
app.use('/api/pinned-areas', pinnedAreas_1.default);
app.use('/api/sensor-readings', sensorReadings_1.default);
app.use('/api/dashboard', dashboard_1.default);
app.use('/api/health', health_1.default);
app.get('/', (req, res) => {
    res.send('Flood Server is running');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

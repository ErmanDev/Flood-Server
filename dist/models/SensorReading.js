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
Object.defineProperty(exports, "__esModule", { value: true });
// In-memory store with some history
const readings = [];
class SensorReading {
    static find() {
        return __awaiter(this, arguments, void 0, function* (query = {}, options = {}) {
            let result = [...readings];
            // sort desc
            result.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            if (options.limit) {
                result = result.slice(0, options.limit);
            }
            return result;
        });
    }
    static findOne() {
        return __awaiter(this, arguments, void 0, function* (query = {}, options = {}) {
            // e.g. sort: { timestamp: -1 }
            const sorted = [...readings].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            return sorted[0];
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReading = {
                _id: Math.random().toString(36).substr(2, 9),
                distance: data.distance,
                distance_ft: data.distance_ft,
                water_level_cm: data.water_level_cm,
                water_level_ft: data.water_level_ft,
                timestamp: new Date(),
                source: data.source || 'sensor',
                server_timestamp: new Date()
            };
            readings.unshift(newReading); // add to start
            if (readings.length > 1000)
                readings.pop(); // limit size
            return newReading;
        });
    }
    static countDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            return readings.length;
        });
    }
}
exports.default = SensorReading;

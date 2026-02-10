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
// In-memory data store for logs - initially empty
const logs = [];
class Log {
    static find() {
        return __awaiter(this, arguments, void 0, function* (query = {}, options = {}) {
            let result = [...logs];
            // simple filtering mock
            if (query.type) {
                result = result.filter(l => l.type === query.type);
            }
            // sort by timestamp desc by default for logs
            result.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            if (options.limit) {
                const skip = options.skip || 0;
                result = result.slice(skip, skip + options.limit);
            }
            return result;
        });
    }
    static findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return logs.find(l => l._id === query._id);
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newLog = {
                _id: Math.random().toString(36).substr(2, 9),
                type: data.type,
                data: data.data,
                timestamp: new Date(),
                source: data.source || null
            };
            logs.push(newLog);
            return newLog;
        });
    }
    static deleteMany() {
        return __awaiter(this, arguments, void 0, function* (query = {}) {
            if (Object.keys(query).length === 0) {
                const count = logs.length;
                logs.length = 0; // Clear array
                return { deletedCount: count };
            }
            return { deletedCount: 0 };
        });
    }
    static countDocuments() {
        return __awaiter(this, arguments, void 0, function* (query = {}) {
            return logs.length;
        });
    }
}
exports.default = Log;

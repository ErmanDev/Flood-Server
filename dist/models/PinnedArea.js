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
// In-memory data store
const pinnedAreas = [];
class PinnedArea {
    static find() {
        return __awaiter(this, arguments, void 0, function* (query = {}) {
            return pinnedAreas;
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newArea = {
                _id: Math.random().toString(36).substr(2, 9),
                latitude: data.latitude,
                longitude: data.longitude,
                address: data.address || null,
                timestamp: new Date(),
                userId: data.userId || null
            };
            pinnedAreas.push(newArea);
            return newArea;
        });
    }
    static findByIdAndDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = pinnedAreas.findIndex(p => p._id === id);
            if (index !== -1) {
                const deleted = pinnedAreas[index];
                pinnedAreas.splice(index, 1);
                return deleted;
            }
            return null;
        });
    }
    static countDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            return pinnedAreas.length;
        });
    }
}
exports.default = PinnedArea;

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
exports.deletePinnedArea = exports.createPinnedArea = exports.getPinnedAreas = void 0;
const PinnedArea_1 = __importDefault(require("../models/PinnedArea"));
const getPinnedAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areas = yield PinnedArea_1.default.find();
        res.json(areas);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getPinnedAreas = getPinnedAreas;
const createPinnedArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { latitude, longitude, address, userId } = req.body;
        const area = yield PinnedArea_1.default.create({ latitude, longitude, address, userId });
        res.status(201).json(area);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createPinnedArea = createPinnedArea;
const deletePinnedArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield PinnedArea_1.default.findByIdAndDelete(id);
        res.json({ message: 'Pinned area removed' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deletePinnedArea = deletePinnedArea;

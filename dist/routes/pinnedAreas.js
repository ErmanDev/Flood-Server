"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pinnedAreaController_1 = require("../controllers/pinnedAreaController");
const router = express_1.default.Router();
router.get('/', pinnedAreaController_1.getPinnedAreas);
router.post('/', pinnedAreaController_1.createPinnedArea);
router.delete('/:id', pinnedAreaController_1.deletePinnedArea);
exports.default = router;

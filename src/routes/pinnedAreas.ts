
import express from 'express';
import { getPinnedAreas, createPinnedArea, deletePinnedArea } from '../controllers/pinnedAreaController';

const router = express.Router();

router.get('/', getPinnedAreas);
router.post('/', createPinnedArea);
router.delete('/:id', deletePinnedArea);

export default router;

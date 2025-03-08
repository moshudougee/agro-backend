import express from 'express';
import { createSeeds, deleteSeed, getAllSeeds, getSeedById, updateSeed } from '../controllers/seedsController.js';
const router = express.Router();
router.post('/create', createSeeds);
router.get('/getSeeds', getAllSeeds);
router.get('/getSeed/:seedId', getSeedById);
router.put('/updateSeed/:seedId', updateSeed);
router.delete('/deleteSeed/:seedId', deleteSeed);
export default router;

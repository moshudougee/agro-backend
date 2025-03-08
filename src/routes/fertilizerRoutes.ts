import express from 'express';
import { createFertilizer, deleteFertilizer, getAllFertilizers, getFertilizerById, updateFertilizer } from '../controllers/fertilizerController';
import { authenticate, authenticateAdmin } from '../middleware/authMiddleware';


const router = express.Router();

router.post('/create',  createFertilizer);
router.get('/getFertilizers',  getAllFertilizers);
router.get('/getFertilizer/:fertilizerId',  getFertilizerById);
router.put('/updateFertilizer/:fertilizerId',  updateFertilizer);
router.delete('/deleteFertilizer/:fertilizerId',  deleteFertilizer);

export default router;

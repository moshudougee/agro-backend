import express from 'express';
import { authenticate, authenticateAdmin } from '../middleware/authMiddleware';
import { addDetails, deleteDetails, getDetails, getDetailsById, updateDetails } from '../controllers/detailsController';


const router = express.Router();

router.post('/add', addDetails);
router.get('/getDetails/:userId', getDetails);
router.get('/getDetailsById/:detailsId', getDetailsById);
router.put('/updateDetails',  updateDetails);
router.delete('/deleteDetails/:userId',  deleteDetails);

export default router;
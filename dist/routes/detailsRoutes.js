import express from 'express';
import { addDetails, deleteDetails, getDetails, getDetailsById, updateDetails } from '../controllers/detailsController.js';
const router = express.Router();
router.post('/add', addDetails);
router.get('/getDetails/:userId', getDetails);
router.get('/getDetailsById/:detailsId', getDetailsById);
router.put('/updateDetails', updateDetails);
router.delete('/deleteDetails/:userId', deleteDetails);
export default router;

import express from 'express';
import multer from 'multer';
import {
  createCardioService,
  getCardioServices,
  getCardioServiceById,
  updateCardioService,
  deleteCardioService
} from '../../controller/subdepartment/cardioController.js';

const cardioRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

cardioRouter.post('/addnew', upload.fields([{ name: 'backgroundImage' }, { name: 'innerImage' }]), createCardioService);
cardioRouter.get('/getall', getCardioServices);
cardioRouter.get('/get/:id', getCardioServiceById);
cardioRouter.put('/update/:id', updateCardioService);
cardioRouter.delete('/delete/:id', deleteCardioService);

export default cardioRouter;

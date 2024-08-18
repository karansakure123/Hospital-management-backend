import express from 'express';
import multer from 'multer';
import {
  createOrthoService,
  getOrthoServices,
  getOrthoServiceById,
  updateOrthoService,
  deleteOrthoService
} from '../../controller/subdepartment/orthoController.js';

const orthoRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

orthoRouter.post('/addnew', upload.fields([{ name: 'backgroundImage' }, { name: 'innerImage' }]), createOrthoService);
orthoRouter.get('/getall', getOrthoServices);
orthoRouter.get('/get/:id', getOrthoServiceById);
orthoRouter.put('/update/:id', updateOrthoService);
orthoRouter.delete('/delete/:id', deleteOrthoService);

export default orthoRouter;

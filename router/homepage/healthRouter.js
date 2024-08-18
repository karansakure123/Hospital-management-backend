// healthRouter.js
import express from 'express';
import {
  getHealthTreatments,
  getHealthTreatmentById,
  createHealthTreatment,
  updateHealthTreatment,
  deleteHealthTreatment,
} from '../../controller/homepage/healthController.js';

const healthRouter = express.Router();

healthRouter.get('/getall', getHealthTreatments);
healthRouter.get('/get/:id', getHealthTreatmentById);
healthRouter.post('/addnew', createHealthTreatment);
healthRouter.put('/update/:id', updateHealthTreatment);
healthRouter.delete('/delete/:id', deleteHealthTreatment);

export default healthRouter;

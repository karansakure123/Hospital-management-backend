// routes/infraRouter.js
import express from 'express';
import {
  createInfrastructure,
  getAllInfrastructures,
  getInfrastructureById,
  updateInfrastructure,
  deleteInfrastructure
} from '../../controller/homepage/infraController.js';

const infraRouter = express.Router();
infraRouter.post('/addnew', createInfrastructure);  
infraRouter.get('/getall', getAllInfrastructures); 
infraRouter.get('/get/:id', getInfrastructureById);  
infraRouter.put('/update/:id', updateInfrastructure);  
infraRouter.delete('/delete/:id', deleteInfrastructure);  



export default infraRouter;

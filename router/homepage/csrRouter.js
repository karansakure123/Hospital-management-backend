import express from 'express';
import { createCSR, getAllCSRs, getCSRById, updateCSR, deleteCSR } from '../../controller/homepage/csrController.js';

const csrRouter = express.Router();

csrRouter.post('/addnew', createCSR); 
 csrRouter.get('/getall', getAllCSRs); 
 csrRouter.get('/get/:id', getCSRById);  
csrRouter.put('/update/:id', updateCSR);  
csrRouter.delete('/delete/:id', deleteCSR);

export default csrRouter;

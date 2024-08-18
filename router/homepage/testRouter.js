// testRouter.js
import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonialById,  
} from '../../controller/homepage/testimonialController.js';

const testRouter = express.Router(); 

testRouter.post('/addnew', createTestimonial); 
testRouter.get('/getall', getTestimonials); 
testRouter.get('/get/:id', getTestimonialById); 
testRouter.put('/update/:id', updateTestimonial); 
testRouter.delete('/delete/:id', deleteTestimonial);

export default testRouter;

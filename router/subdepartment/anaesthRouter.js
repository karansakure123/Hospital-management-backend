import express from 'express';
import multer from 'multer'; // Import multer for handling file uploads
import {
  createAnaesthesiaService,
  getAnaesthesiaServices,
  getAnaesthesiaServiceById,
  updateAnaesthesiaService,
  deleteAnaesthesiaService
} from '../../controller/subdepartment/anaesthController.js';

// Create an instance of the router
const anaesthRouter = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage for easier handling of file uploads
const upload = multer({ storage }); // Create multer instance with storage configuration

// Define routes
anaesthRouter.post('/addnew', upload.fields([{ name: 'backgroundImage' }, { name: 'innerImage' }]), createAnaesthesiaService);
anaesthRouter.get('/getall', getAnaesthesiaServices); 
anaesthRouter.get('/get/:id', getAnaesthesiaServiceById); 
anaesthRouter.put('/update/:id', updateAnaesthesiaService); 
anaesthRouter.delete('/delete/:id', deleteAnaesthesiaService);

// Export the router
export default anaesthRouter;

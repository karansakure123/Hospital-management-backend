// aboutRouter.js
import express from "express";
import upload from '../../middlewares/multer.js';
import { 
  createAccrediation, 
  deleteAccrediation, 
  getAccreadiation, 
  getAccreadiationById, 
  updateAccrediation 
} from "../../controller/about/accrediationController.js";
import { 
  createDirector, 
  deleteDirector, 
  getDirector, 
  getDirectorById, 
  updateDirector 
} from "../../controller/about/directorController.js";

const aboutRouter = express.Router();

// Accreditation routes
aboutRouter.post('/accreditation/addnew', upload, createAccrediation); // Use 'upload' middleware here
aboutRouter.get('/accreditation/getall', getAccreadiation);
aboutRouter.get('/accreditation/get/:id', getAccreadiationById);
aboutRouter.put('/accreditation/:id', upload, updateAccrediation);
aboutRouter.delete('/accreditation/delete/:id', deleteAccrediation);

// Director routes
aboutRouter.post('/director/addnew', upload, createDirector); // Use 'upload' middleware here
aboutRouter.get('/director/getall', getDirector); // Fix: Assuming you want to get all directors
aboutRouter.get('/director/get/:id', getDirectorById);
aboutRouter.put('/director/update/:id', updateDirector);
aboutRouter.delete('/director/delete/:id', deleteDirector);

export default aboutRouter;

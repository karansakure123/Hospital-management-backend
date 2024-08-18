import express from 'express';
import {
  getFooterLinks,
  getFooterLinkById,
  createFooterLink,
  updateFooterLink,
  deleteFooterLink,
} from '../../controller/homepage/footerController.js ';
import { deleteFooterById, getFooterItemById } from '../../controller/homepage/footerController.js';

const footerRouter = express.Router();

// Define routes
footerRouter.get('/getall', getFooterLinks);
footerRouter.get('/get/:id', getFooterLinkById);  
footerRouter.get('/get/item/:itemId', getFooterItemById);  
footerRouter.post('/addnew', createFooterLink);
footerRouter.put('/update/:id', updateFooterLink);
footerRouter.delete('/delete/:id', deleteFooterLink);
footerRouter.delete('/deleteById/:id', deleteFooterById);

export default footerRouter;

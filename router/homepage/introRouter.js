// introRoute.js
import express from 'express';
import { createIntro, getAllIntros, getIntroById, updateIntro, deleteIntro } from '../../controller/homepage/introController.js';

const introRouter = express.Router();

// Routes
introRouter.post('/addnew', createIntro); // Create
introRouter.get('/get', getAllIntros); // Read all
introRouter.get('/get/:id', getIntroById); // Read by ID
introRouter.put('/update/:id', updateIntro); // Update
introRouter.delete('/delete/:id', deleteIntro); // Delete

export default introRouter;

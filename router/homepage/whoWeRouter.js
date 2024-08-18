// routes/whoWeAreRoutes.js
import express from 'express';
import { createWhoWeAre, getAllWhoWeAre, getWhoWeAreById, updateWhoWeAre, deleteWhoWeAre } from '../../controller/homepage/whoweController.js';

const whoWeRouter = express.Router();

whoWeRouter.post('/addnew', createWhoWeAre);
whoWeRouter.get('/getall', getAllWhoWeAre);
whoWeRouter.get('/get/:id', getWhoWeAreById);
whoWeRouter.put('/update/:id', updateWhoWeAre);
whoWeRouter.delete('/delete/:id', deleteWhoWeAre);

export default whoWeRouter;

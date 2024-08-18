import express from 'express';
import speakController from '../../controller/homepage/patientSpeakController.js';

const speakRouter = express.Router();

speakRouter.get('/getall', speakController.getPatientspeaks);  
speakRouter.get('/get/:id', speakController.getPatientspeakById);  
speakRouter.post('/addnew', speakController.createPatientspeak);
speakRouter.put('/update/:id', speakController.updatePatientspeak);  
speakRouter.delete('/delete/:id', speakController.deletePatientspeak);  

export default speakRouter;

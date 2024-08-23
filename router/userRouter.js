import express from 'express';
import {
    addNewAdmin,
    addNewDoctor,
    getDoctors,
    getUsers,
    login,
    updateDoctor,
    deleteDoctor,
    logoutAdmin,
    logoutPatient,
    patientRegister,
} from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/patient/register', patientRegister);
userRouter.post('/login', login);
userRouter.post('/admin/addnew', addNewAdmin);
userRouter.get('/doctors', getDoctors);
userRouter.put('/doctors/update/:id', updateDoctor);
userRouter.delete('/doctors/delete/:id', deleteDoctor);
userRouter.get('/admin/me', getUsers);
userRouter.get('/patient/me', getUsers); // Removed authentication middleware
userRouter.get('/admin/logout', logoutAdmin);
userRouter.get('/patient/logout', logoutPatient);
userRouter.post('/doctor/addnew', addNewDoctor);

export default userRouter;

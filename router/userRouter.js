import express from "express";
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
 } from "../controller/userController.js";
import { isAdminAuthenticate, isPatientAuthenticate } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/patient/register", patientRegister);
 

userRouter.post("/login", login);
userRouter.post("/admin/addnew", isAdminAuthenticate, addNewAdmin);
userRouter.get("/doctors", getDoctors);

userRouter.put("/doctors/update/:id", updateDoctor);
 userRouter.delete("/doctors/delete/:id", deleteDoctor);
userRouter.get("/admin/me", isAdminAuthenticate, getUsers);
userRouter.get("/patient/me", isPatientAuthenticate, getUsers);
userRouter.get("/admin/logout", isAdminAuthenticate, logoutAdmin);
userRouter.get("/patient/logout", isPatientAuthenticate, logoutPatient);
userRouter.post("/doctor/addnew",isAdminAuthenticate, addNewDoctor);

export default userRouter;

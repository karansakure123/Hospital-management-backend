import express from "express";
import { postAppointment,getAllAppointments ,updateAppointmentStatus, deleteAppointment} from "../controller/appointmentContoller.js";
import {  isPatientAuthenticate} from "../middlewares/auth.js"
 const router  = express.Router()
router.post("/post", isPatientAuthenticate, postAppointment)
router.get("/getall",   getAllAppointments)
router.put("/update/:id", updateAppointmentStatus, getAllAppointments)
router.delete("/delete/:id", deleteAppointment, getAllAppointments)

export default router
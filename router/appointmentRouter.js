import express from "express";
import { postAppointment,getAllAppointments ,updateAppointmentStatus, deleteAppointment} from "../controller/appointmentContoller.js";
  const router  = express.Router()
router.post("/post", postAppointment)
router.get("/getall",   getAllAppointments)
router.put("/update/:id", updateAppointmentStatus, getAllAppointments)
router.delete("/delete/:id", deleteAppointment, getAllAppointments)

export default router
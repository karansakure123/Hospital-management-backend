import { catchAssyncErrors } from "../middlewares/catchAssyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
export const postAppointment = catchAssyncErrors(async (req, res, next) => {
   const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  // Ensure all fields are provided
  if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !appointment_date || !department || !doctor_firstName || !doctor_lastName || !address) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // Create an appointment object
  const appointmentData = {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob: new Date(dob), // Ensure this is a Date object
    gender,
    appointment_date: new Date(appointment_date), // Ensure this is a Date object
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    department,
    hasVisited,
    address,
  };

  // Log appointment data for debugging
  console.log('Creating appointment with data:', appointmentData);

  // Create the appointment
  const appointment = await Appointment.create(appointmentData);

  // Respond with success
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Sent!",
  });
});


export const getAllAppointments = catchAssyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();  
  res.status(200).json({
    success: true,
     appointments,
  });
});
export const updateAppointmentStatus = catchAssyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
      appointment,
    });
  }
);
export const deleteAppointment = catchAssyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});
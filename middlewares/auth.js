import { User } from "../models/userSchema.js";
import {catchAssyncErrors} from "./catchAssyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import jwt from "jsonwebtoken";
// Function to generate a token
 export const isAdminAuthenticate = catchAssyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
      return next(new ErrorHandler("Admin Not Authenticated!", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (!req.user || req.user.role !== "Admin") {
      return next(new ErrorHandler("Admin not authorized for resources!", 400));
  }
  
  next();
});

export const isPatientAuthenticate = catchAssyncErrors(
  async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ErrorHandler("User is not authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
  }
);
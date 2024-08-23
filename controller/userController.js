import { catchAssyncErrors } from '../middlewares/catchAssyncErrors.js';
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtTokens.js"
import cloudinary from "cloudinary"
 

export const patientRegister = catchAssyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Patient",
  });
  generateToken(user, "User Registered!", 200, res);
});



 asdasdasda

export const adminRegister = catchAssyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password, confirmPassword, role } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please fill in all fields!", 400));
  }

  // Validate role
  const validRoles = ["Admin", "Patient"]; // Add any other valid roles if needed
  if (!validRoles.includes(role)) {
    return next(new ErrorHandler("Invalid role provided!", 400));
  }

  // Check if the user already exists
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already registered!", 400));
  }

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match!", 400));
  }

  // Create a new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role
  });

  // Generate token and respond
  const token = user.generateWebToken();
  res.status(201).json({
    success: true,
    message: "User registered successfully!",
    user,
    token
  });
});


export const login = catchAssyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler(`User Not Found With This Role!`, 400));
  }
  generateToken(user, "Login Successfully!", 201, res);
});

export const addNewAdmin = catchAssyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});




export const getDoctors = catchAssyncErrors(async (req, res, next) => {
  // Check if the department query parameter is provided
  const department = req.query.department;
  
  // Find doctors with the specified role and department
  const query = { role: "Doctor" };
  if (department) {
    query.doctorDepartment = department; // Add department filter
  }

  const doctors = await User.find(query);
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUsers = catchAssyncErrors(async (req, res, next) => { // Fixed typo in 'catchAsyncErrors'
  const user = req.user;

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  console.log("Retrieved user:", user);

  res.status(200).json({
    success: true,
    user,
  });
});



export const logoutAdmin =(async(req,res,next)=>{
res.status(200)
.cookie("adminToken","",{
  httpOnly:true,
  expires:new  Date(Date.now())
})
.json({
  success:true,
  message:"Admin logged out successfully",
})
})


export const logoutPatient =(async(req,res,next)=>{
  res.status(200)
  .cookie("patientToken","",{
    httpOnly:true,
    expires:new  Date(Date.now())
  })
  .json({
    success:true,
    message:"Patient logged out successfully",
  })
  })
   


  









  export const addNewDoctor = catchAssyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        doctorDepartment,
        specialty, // Ensure consistent naming here
    } = req.body;

    // Check for required fields
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler("Doctor With This Email Already Exists!", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
        return next(new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500));
    }

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        specialty, // Ensure consistent naming here
        role: "Doctor",
        doctorDepartment,
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        message: "New Doctor Registered",
        doctor,
    });
});

export const updateDoctor = catchAssyncErrors(async (req, res, next) => {
    const doctorId = req.params.id; // Get doctor ID from the request parameters
    const updates = req.body; // Get updated details from the request body

    // Check if the doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor) {
        return next(new ErrorHandler("Doctor not found", 404));
    }

    // If an avatar is provided, handle the file upload and update the avatar
    if (req.files && req.files.docAvatar) {
        let { docAvatar } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(docAvatar.mimetype)) {
            return next(new ErrorHandler("File Format Not Supported!", 400));
        }

        // Upload the new avatar to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500));
        }

        // Update the avatar information
        updates.docAvatar = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    // Update the doctor with the new details
    const updatedDoctor = await User.findByIdAndUpdate(doctorId, updates, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        message: "Doctor updated successfully",
        doctor: updatedDoctor,
    });
});







  export const deleteDoctor = catchAssyncErrors(async (req, res, next) => {
    const doctorId = req.params.id; // Get doctor ID from the request parameters

    // Check if the doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor) {
        return next(new ErrorHandler("Doctor not found", 404));
    }

    // Optionally, delete the doctor's avatar from Cloudinary
    if (doctor.docAvatar && doctor.docAvatar.public_id) {
        await cloudinary.uploader.destroy(doctor.docAvatar.public_id);
    }

    // Delete the doctor from the database
    await User.findByIdAndDelete(doctorId);

    res.status(200).json({
        success: true,
        message: "Doctor deleted successfully",
    });
});

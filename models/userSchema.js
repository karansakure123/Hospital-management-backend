import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, "First Name must contain at least 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [3, "Last Name must contain at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  phone: {
    type: String,
    required: true,
    minlength: [10, "Phone numbers must be 10 digits"],
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  message: {
    type: String,
    minlength: [10, "Message must be at least 10 characters"],
    maxlength: [10, "Message must be at most 10 characters"],
  },
  nic: {
    type: String,
    required: [true, 'Please provide NIC'],
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'], 
  },
  dob: {
    type: Date,
    required: [true, "DOB is required"],
  },
  password: {
    type: String,
    minLength: [6, "Password must be at least 6 characters!"],
    required: true,
    select: false,
  },

  role: {
    type: String,
    default: 'Patient',  
  },
  
  doctorDepartment: {
    type: String
  },
  speciality:{
    type:String,
    required:false
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateWebToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES }
  );
};

export const User = mongoose.model("User", userSchema);

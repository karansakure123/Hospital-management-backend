import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, "First Name must contain at least 3 characters"]
  },
  lastName: {
    type: String,
    required: true, 
    minlength: [3, "Last Name must contain at least 3 characters"]
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email"
    }
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
  nic: {
    type: String,
    required: [true, 'Please provide NIC']
  },
  dob: {
    type: Date,
    required: [true, "DOB is required"]
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Please provide gender']
  },
  appointment_date: {
    type: Date,
    required: true
  },
  doctor: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  department: {
    type: String,
    required: true
  },
  hasVisited: {
    type: Boolean,
   },
  doctorId: {
    type: mongoose.Schema.ObjectId,
   },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending"
  }
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);

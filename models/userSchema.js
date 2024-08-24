import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    minlength: [3, "First Name must contain at least 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    minlength: [3, "Last Name must contain at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true, // Ensure email is unique
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    minlength: [10, "Phone number must be at least 10 digits"],
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  nic: {
    type: String,
    required: [true, 'NIC is required'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other'], 
  },
  dob: {
    type: Date,
    required: [true, 'Date of Birth is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, "Password must be at least 6 characters!"],
    select: false, // Hide password by default
  },
  role: {
    type: String,
    enum: ['Admin', 'Patient', 'Doctor'], // Include other roles if necessary
    required: [true, 'Role is required'],
  },
  doctorDepartment: {
    type: String,
    required: function() {
      return this.role === 'Doctor'; // Required only if the role is 'Doctor'
    }
  },
  specialty: {
    type: String,
    required: function() {
      return this.role === 'Doctor'; // Required only if the role is 'Doctor'
    }
  },
  docAvatar: {
    type: String, // Changed to String to store URL directly
  }
});

 
// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);

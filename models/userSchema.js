import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

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
    enum: ['Admin', 'Patient', 'Doctor'], // Include any other roles you need
    required: true
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
    public_id: String,
    url: String,
   }
  ,
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

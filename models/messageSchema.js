import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    minlength: [10, "Message must be at least 10 characters"]
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const Message = mongoose.model("Message", messageSchema);

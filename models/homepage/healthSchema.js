// schema.js
import mongoose from 'mongoose';

const healthSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { // Change this field to be optional
    type: String,
    required: false, // This field is now optional
  },
  icon: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Health', healthSchema);

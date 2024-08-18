import mongoose from 'mongoose';

// Define the schema for the "Who We Are" section
const whoWeSchema = new mongoose.Schema({
  sectionTitle: {
    type: String,
    required: true,
  },
  para1: {
    type: String,
    required: true, // First paragraph is required
  },
  para2: {
    type: String,
    required: false, // Second paragraph is optional
  },
  para3: {
    type: String,
    required: false, // Third paragraph is optional
  },
  buttonLabel: {
    type: String,
    required: true,
  },
});

// Check if the model is already defined, if not, define it
const modelName = 'WhoWeAre';
const WhoWeAre = mongoose.models[modelName] || mongoose.model(modelName, whoWeSchema);

export default WhoWeAre;

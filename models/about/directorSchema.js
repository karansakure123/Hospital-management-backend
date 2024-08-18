import mongoose from "mongoose";
 
// Define the Director schema
const directorSchema = new mongoose.Schema({
  dircImg: {
    type: String,
    required: true,
  },
  dircHeading: {
    type: String,
    required: true,
  },
  dircSpeciality: {
    type: String,
    required: true,
  },
});

// Create models
 const Director = mongoose.model("Director", directorSchema);

// Export the models
export default Director; 
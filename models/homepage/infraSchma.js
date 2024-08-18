import mongoose from 'mongoose';

// Define the InfraSchema
const InfraSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true, // Ensure heading is required
    },
    leftImage: {
      type: String,
      required: true, // Ensure leftImage is required
    },
    images: {
      type: [String], // Array of strings for multiple image URLs
      required: true, // Ensure images array is required
    },
    description: {
      type: String,
      required: false, // Description is optional
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt timestamps
);

// Export the Infrastructure model based on the InfraSchema
const Infrastructure = mongoose.model('Infrastructure', InfraSchema);
export default Infrastructure;

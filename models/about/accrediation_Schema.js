import mongoose from "mongoose";
 const accrediationSchema = new mongoose.Schema({
  accTitle: {
    required: false,
    type: String,
  },
  accDesc1: {
    required: true,
    type: String,
  },
  accDesc2: {
    required: false,
    type: String,
  },
  accImg: {
    required: true,
    type: String,
  },
});
 
// Create models
const Accrediation = mongoose.model("Accrediation", accrediationSchema);
 
// Export the models
export default Accrediation; 
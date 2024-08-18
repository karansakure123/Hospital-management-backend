import mongoose from "mongoose";

// Define the equippedSchema
const equippedSchema = new mongoose.Schema({
  eqpHeading: {
    type: String,
    required: false,
  },
  eqpImg: {
    type: String,
    required: true,
  },
  eqpTitle: {
    type: String,
    required: true,
  },
});
 
// Create models from the schemas
const Equipped = mongoose.model("Equipped", equippedSchema); 

 export default Equipped;

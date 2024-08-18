import mongoose from "mongoose";


// Define the corporateSchema
const corporateSchema = new mongoose.Schema({
    corpHeading: {
      type: String,
      required: true,
    },
    corpDetail: {
      type: String,
      required: true,
    },
    corpImg: {
      type: String,
      required: true,
    },
  });
   
  const Corporate = mongoose.model("Corporate", corporateSchema);
  
   export default  Corporate ;
  
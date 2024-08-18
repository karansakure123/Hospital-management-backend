import mongoose from 'mongoose';

const orthoSchema = new mongoose.Schema({
  backgroundImage: { type: String, required: true },
  innerImage: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  additionalInfo: { type: String, required: true },
  treatmentOptions: { type: [String], required: false }, // Example field for ortho-specific data
  contactInfo: { 
    phone: { type: String, required: false },
    email: { type: String, required: false }
  }
});

const Ortho = mongoose.model('Ortho', orthoSchema);

export default Ortho;

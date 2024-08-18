import mongoose from 'mongoose';

const anaesthSchema = new mongoose.Schema({
  backgroundImage: { type: String, required: true },
  innerImage: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  additionalInfo: { type: String, required: true },
});

const AnaesthesiaService = mongoose.model('AnaesthesiaService', anaesthSchema);

export default AnaesthesiaService;

import mongoose from 'mongoose';

const cardioSchema = new mongoose.Schema({
  backgroundImage: { type: String, required: true },
  innerImage: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  additionalInfo: { type: String, required: true },
});

const Cardio = mongoose.model('Cardio', cardioSchema);

export default Cardio;

import mongoose from 'mongoose';

const speakSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const Speak = mongoose.model('Speak', speakSchema);

export default Speak;

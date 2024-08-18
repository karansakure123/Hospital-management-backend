import mongoose from 'mongoose';

const introSchema = new mongoose.Schema({
  Heading: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Intro = mongoose.model('Intro', introSchema);

export default Intro;

// testSchema.js
import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
export default Testimonial;

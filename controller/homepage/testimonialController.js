// testController.js
import Testimonial from '../../models/homepage/testSchema.js';

// Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    console.log(testimonials); // Log the retrieved testimonials
    res.json(testimonials);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

  // Get a testimonial by ID
  export const getTestimonialById = async (req, res) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Create a testimonial
  export const createTestimonial = async (req, res) => {
    const testimonial = new Testimonial(req.body);
    try {
      const savedTestimonial = await testimonial.save();
      res.status(201).json(savedTestimonial);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Update a testimonial
  export const updateTestimonial = async (req, res) => {
    try {
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      res.json(updatedTestimonial);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a testimonial
  export const deleteTestimonial = async (req, res) => {
    try {
      const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
      if (!deletedTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      res.json({ message: 'Testimonial deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
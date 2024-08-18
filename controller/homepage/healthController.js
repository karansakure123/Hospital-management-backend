// healthController.js
import Health from '../../models/homepage/healthSchema.js';

// Get all health treatments
export const getHealthTreatments = async (req, res) => {
  try {
    const treatments = await Health.find();
    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific health treatment by ID
export const getHealthTreatmentById = async (req, res) => {
  try {
    const treatment = await Health.findById(req.params.id);
    if (!treatment) return res.status(404).send('Health treatment not found');
    res.status(200).json(treatment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// healthController.js
 
// Create a new health treatment
export const createHealthTreatment = async (req, res) => {
  const { title, description, icon } = req.body;

  // Validate the incoming data
  if (!title || !icon) { // Only require title and icon
    return res.status(400).json({ message: 'All fields are required: title and icon.' });
  }

  // Create a new Health instance
  const health = new Health({
    title,
    description: description || '', // Use an empty string if no description is provided
    icon,
  });

  try {
    const savedHealth = await health.save();
    res.status(201).json(savedHealth);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save health treatment.', error: error.message });
  }
};

  


// Update a health treatment
export const updateHealthTreatment = async (req, res) => {
  try {
    const updatedHealth = await Health.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHealth) return res.status(404).send('Health treatment not found');
    res.status(200).json(updatedHealth);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a health treatment
export const deleteHealthTreatment = async (req, res) => {
  try {
    const deletedHealth = await Health.findByIdAndDelete(req.params.id);
    if (!deletedHealth) return res.status(404).send('Health treatment not found');
    res.status(200).json({ message: 'Health treatment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

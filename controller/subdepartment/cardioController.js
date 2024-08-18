import cloudinary from 'cloudinary';
import Cardio from '../../models/subdepartment/cardioSchema.js'; // Update the import to your cardio schema

// Create a new cardiology service
export const createCardioService = async (req, res) => {
  try {
    const { title, description, additionalInfo, extraDescriptions, backgroundImageUrl, innerImageUrl } = req.body;

    // Validate required fields
    if (!title || !description || !additionalInfo || !backgroundImageUrl || !innerImageUrl) {
      console.log('Missing fields:', { title, description, additionalInfo, backgroundImageUrl, innerImageUrl });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new service
    const newService = new Cardio({
      backgroundImage: backgroundImageUrl,
      innerImage: innerImageUrl,
      title,
      description,
      additionalInfo,
      extraDescriptions: extraDescriptions || [],
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error('Error in createCardioService:', error);
    res.status(500).json({ message: 'Error creating cardiology service', error: error.message });
  }
};

// Get all cardiology services
export const getCardioServices = async (req, res) => {
  try {
    const services = await Cardio.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching cardiology services:', error);
    res.status(500).json({ message: 'Error fetching cardiology services', error });
  }
};

// Get a specific cardiology service by ID
export const getCardioServiceById = async (req, res) => {
  try {
    const service = await Cardio.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Cardiology service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching cardiology service by ID:', error);
    res.status(500).json({ message: 'Error fetching cardiology service', error });
  }
};

// Update a specific cardiology service by ID
export const updateCardioService = async (req, res) => {
  try {
    const { title, description, additionalInfo, extraDescriptions, backgroundImageUrl, innerImageUrl } = req.body;

    // Prepare update data
    const updateData = { title, description, additionalInfo, extraDescriptions };

    // Update image URLs if provided
    if (backgroundImageUrl) {
      updateData.backgroundImage = backgroundImageUrl;
    }
    if (innerImageUrl) {
      updateData.innerImage = innerImageUrl;
    }

    const updatedService = await Cardio.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Cardiology service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating cardiology service:', error);
    res.status(500).json({ message: 'Error updating cardiology service', error });
  }
};

// Delete a specific cardiology service by ID
export const deleteCardioService = async (req, res) => {
  try {
    const deletedService = await Cardio.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Cardiology service not found' });
    }
    res.status(200).json({ message: 'Cardiology service deleted successfully' });
  } catch (error) {
    console.error('Error deleting cardiology service:', error);
    res.status(500).json({ message: 'Error deleting cardiology service', error });
  }
};

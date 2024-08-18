import cloudinary from 'cloudinary';
import AnaesthesiaService from '../../models/subdepartment/anaesthSchema.js';

// Create a new anaesthesia service
export const createAnaesthesiaService = async (req, res) => {
  try {
    const { title, description, additionalInfo, extraDescriptions, backgroundImageUrl, innerImageUrl } = req.body;

    // Validate required fields
    if (!title || !description || !additionalInfo || !backgroundImageUrl || !innerImageUrl) {
      console.log('Missing fields:', { title, description, additionalInfo, backgroundImageUrl, innerImageUrl });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new service
    const newService = new AnaesthesiaService({
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
    console.error('Error in createAnaesthesiaService:', error);
    res.status(500).json({ message: 'Error creating anaesthesia service', error: error.message });
  }
};

// Get all anaesthesia services
export const getAnaesthesiaServices = async (req, res) => {
  try {
    const services = await AnaesthesiaService.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching anaesthesia services:', error);
    res.status(500).json({ message: 'Error fetching anaesthesia services', error });
  }
};

// Get a specific anaesthesia service by ID
export const getAnaesthesiaServiceById = async (req, res) => {
  try {
    const service = await AnaesthesiaService.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Anaesthesia service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching anaesthesia service by ID:', error);
    res.status(500).json({ message: 'Error fetching anaesthesia service', error });
  }
};

// Update a specific anaesthesia service by ID
export const updateAnaesthesiaService = async (req, res) => {
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

    const updatedService = await AnaesthesiaService.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Anaesthesia service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating anaesthesia service:', error);
    res.status(500).json({ message: 'Error updating anaesthesia service', error });
  }
};

// Delete a specific anaesthesia service by ID
export const deleteAnaesthesiaService = async (req, res) => {
  try {
    const deletedService = await AnaesthesiaService.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Anaesthesia service not found' });
    }
    res.status(200).json({ message: 'Anaesthesia service deleted successfully' });
  } catch (error) {
    console.error('Error deleting anaesthesia service:', error);
    res.status(500).json({ message: 'Error deleting anaesthesia service', error });
  }
};

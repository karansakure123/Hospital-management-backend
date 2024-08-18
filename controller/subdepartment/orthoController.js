import Ortho from '../../models/subdepartment/orthoSchema.js'; // Update the import to your Ortho schema

// Create a new orthopedics service
export const createOrthoService = async (req, res) => {
  try {
    const { title, description, additionalInfo, treatmentOptions, backgroundImageUrl, innerImageUrl } = req.body;

    // Validate required fields
    if (!title || !description || !additionalInfo || !backgroundImageUrl || !innerImageUrl) {
      console.log('Missing fields:', { title, description, additionalInfo, backgroundImageUrl, innerImageUrl });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new service
    const newService = new Ortho({
      backgroundImage: backgroundImageUrl,
      innerImage: innerImageUrl,
      title,
      description,
      additionalInfo,
      treatmentOptions: treatmentOptions || [],
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error('Error in createOrthoService:', error);
    res.status(500).json({ message: 'Error creating orthopedics service', error: error.message });
  }
};

// Get all orthopedics services
export const getOrthoServices = async (req, res) => {
  try {
    const services = await Ortho.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching orthopedics services:', error);
    res.status(500).json({ message: 'Error fetching orthopedics services', error });
  }
};

// Get a specific orthopedics service by ID
export const getOrthoServiceById = async (req, res) => {
  try {
    const service = await Ortho.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Orthopedics service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching orthopedics service by ID:', error);
    res.status(500).json({ message: 'Error fetching orthopedics service', error });
  }
};

// Update a specific orthopedics service by ID
export const updateOrthoService = async (req, res) => {
  try {
    const { title, description, additionalInfo, treatmentOptions, backgroundImageUrl, innerImageUrl } = req.body;

    // Prepare update data
    const updateData = { title, description, additionalInfo, treatmentOptions };

    // Update image URLs if provided
    if (backgroundImageUrl) {
      updateData.backgroundImage = backgroundImageUrl;
    }
    if (innerImageUrl) {
      updateData.innerImage = innerImageUrl;
    }

    const updatedService = await Ortho.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Orthopedics service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating orthopedics service:', error);
    res.status(500).json({ message: 'Error updating orthopedics service', error });
  }
};

// Delete a specific orthopedics service by ID
export const deleteOrthoService = async (req, res) => {
  try {
    const deletedService = await Ortho.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Orthopedics service not found' });
    }
    res.status(200).json({ message: 'Orthopedics service deleted successfully' });
  } catch (error) {
    console.error('Error deleting orthopedics service:', error);
    res.status(500).json({ message: 'Error deleting orthopedics service', error });
  }
};

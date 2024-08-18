import Speak from "../../models/homepage/speakSchema.js"
// Get all patient speaks

 const getPatientspeaks = async (req, res) => {
    try {
      const speaks = await Speak.find();
      res.status(200).json(speaks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching speaks', error });
    }
  };
  
  // Get a patient speak by ID
  const getPatientspeakById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const speak = await Speak.findById(id);
      if (speak) {
        res.status(200).json(speak);
      } else {
        res.status(404).json({ message: 'Speak not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching speak', error });
    }
  };


  // create
  
  const createPatientspeak = async (req, res) => {
    const { name, text, videoUrl } = req.body;
    const newSpeak = new Speak({ name, text, videoUrl });
  
    try {
      await newSpeak.save();
      res.status(201).json({
        message: 'Speak created successfully',
        data: newSpeak,
      });
    } catch (error) {
      res.status(400).json({ message: 'Error creating speak', error });
    }
  };
  


// Update a patient speak
const updatePatientspeak = async (req, res) => {
  const { id } = req.params;
  const { name, text, videoUrl } = req.body;

  try {
    const updatedSpeak = await Speak.findByIdAndUpdate(
      id,
      { name, text, videoUrl },
      { new: true }
    );
    res.status(200).json(updatedSpeak);
  } catch (error) {
    res.status(400).json({ message: 'Error updating speak', error });
  }
};

// Delete a patient speak
const deletePatientspeak = async (req, res) => {
  const { id } = req.params;

  try {
    await Speak.findByIdAndDelete(id);
    res.status(204).json({ message: 'Speak deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting speak', error });
  }
};

export default {
    getPatientspeaks,
    getPatientspeakById,
    createPatientspeak,
    updatePatientspeak,
    deletePatientspeak,
  };
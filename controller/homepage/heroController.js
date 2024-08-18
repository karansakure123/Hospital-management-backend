import Hero from "../../models/homepage/heroSchema.js"; // Ensure this path is correct
import mongoose from "mongoose"; // Import mongoose for ObjectId validation

// Create Hero Section
// Create Hero Section
export const createHero = async (req, res) => {
    console.log('Uploaded file:', req.file); // Log the uploaded file
    console.log('Request body:', req.body); // Log the request body for debugging

    let imageUrl;

    // Check if a file was uploaded or if an image URL is provided
    if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
        imageUrl = req.body.imageUrl;
    } else {
        return res.status(400).json({ success: false, message: 'No file uploaded and no image URL provided' });
    }

    try {
        // Create a new hero section in the database
        const hero = await Hero.create({ sliderImg: imageUrl });
        return res.status(201).json({ success: true, message: 'Hero section created', hero });
    } catch (error) {
        console.error('Error while creating hero section:', error);
        return res.status(500).json({ success: false, message: 'Error creating hero section' });
    }
};

// Get all Heroes
export const getHero = async (req, res) => {
    try {
        const heroes = await Hero.find(); // Fetch all heroes
        res.status(200).json({ success: true, heroes });
    } catch (error) {
        console.error('Error fetching heroes:', error);
        res.status(500).json({ success: false, message: "Error fetching heroes" });
    }
};

// Get Hero by ID
export const getHeroById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    try {
        const hero = await Hero.findById(id);
        if (!hero) {
            return res.status(404).json({ success: false, message: "Hero not found" });
        }
        return res.status(200).json({ success: true, hero });
    } catch (error) {
        console.error('Error fetching hero:', error);
        return res.status(500).json({ success: false, message: "Error fetching hero" });
    }
};

// Update Hero Section
export const updateHero = async (req, res) => {
    const { id } = req.params;
    const { heroImg } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    let imageUrl;
    if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`; // File upload path
    } else if (heroImg) {
        imageUrl = heroImg; // Image URL provided by user
    } else {
        return res.status(400).json({ success: false, message: "No file or hero image provided" });
    }

    try {
        const hero = await Hero.findByIdAndUpdate(id, { sliderImg: imageUrl }, { new: true });
        if (!hero) {
            return res.status(404).json({ success: false, message: "Hero section not found" });
        }
        return res.status(200).json({ success: true, message: "Hero section updated", hero });
    } catch (error) {
        console.error('Error updating hero section:', error);
        return res.status(500).json({ success: false, message: "Error updating hero section" });
    }
};

// Delete Hero Section
export const deleteHero = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    try {
        const hero = await Hero.findByIdAndDelete(id);
        if (!hero) {
            return res.status(404).json({ success: false, message: "Hero section not found" });
        }
        return res.status(200).json({ success: true, message: "Hero section deleted successfully" });
    } catch (error) {
        console.error('Error deleting hero section:', error);
        return res.status(500).json({ success: false, message: "Error deleting hero section" });
    }
};

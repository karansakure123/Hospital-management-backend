import mongoose from "mongoose";
import Accrediation from "../../models/about/accrediation_Schema.js";

// Create Accreditation function
export const createAccrediation = async (req, res) => {
  try {
    const { accTitle, accDesc1, accDesc2 } = req.body;
    const accImg = req.file ? req.file.path : req.body.accImg;

    if (!accImg) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const accrediation = new Accrediation({
      accTitle,
      accDesc1,
      accDesc2,
      accImg,
    });

    await accrediation.save();

    res.status(200).json({
      success: true,
      message: "New Accreditation Created 👍",
      accrediation
    });
  } catch (error) {
    console.error("Error creating accreditation:", error); // Log the error
    res.status(400).json({ success: false, message: error.message || "An error occurred" });
  }
};

// Get all Accreditations
export const getAccreadiation = async (req, res) => {
  try {
    const accreditations = await Accrediation.find();
    res.status(200).json({ success: true, message: "Accreditations fetched successfully", accreditations });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "An error occurred" });
  }
};



export const getAccreadiationById = async (req, res) => {
  const { id } = req.params;

  console.log("Received ID:", id); // Log the ID to see what's being received

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid or missing ID" });
  }

  try {
    const accrediation = await Accrediation.findById(id);
    if (!accrediation) {
      return res.status(404).json({ success: false, message: "Accreditation not found" });
    }
    res.status(200).json({ success: true, message: "Accreditation fetched successfully", accrediation });
  } catch (error) {
    console.error("Error fetching accreditation:", error); // Log the error for debugging
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};


export const updateAccrediation = async (req, res) => {
  const { id } = req.params;
  const { accTitle, accDesc1, accDesc2, accImg } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid accreditation ID"
    });
  }

  try {
    const updateData = {
      accTitle,
      accDesc1,
      accDesc2,
      accImg, // Assuming accImg is a URL
    };

    const updateAccrediation = await Accrediation.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateAccrediation) {
      return res.status(404).json({ success: false, message: "Accreditation not found" });
    }

    return res.status(200).json({ success: true, message: "Accreditation updated successfully", data: updateAccrediation });
  } catch (error) {
    console.error("Error updating accreditation", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteAccrediation = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteAccrediation = await Accrediation.findByIdAndDelete(id);
    if (!deleteAccrediation) {
      return res
        .status(400) // Changed 'tus(400)' to 'status(400)'
        .json({ success: false, message: "Accrediation not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Accrediation Deleted Successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "error deleting api 🥲 " + error.message });
  }
};


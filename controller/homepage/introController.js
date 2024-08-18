// controllers/introController.js
import mongoose from 'mongoose';
import Intro from '../../models/homepage/introSchema.js';
import { catchAssyncErrors } from '../../middlewares/catchAssyncErrors.js';
import ErrorHandler from "../../middlewares/errorMiddleware.js";

// Create Intro
export const createIntro = catchAssyncErrors(async (req, res, next) => {
  const { Heading, title, description, imageUrl } = req.body;

  if (!Heading || !title || !description || !imageUrl) {
    return next(new ErrorHandler("Please fill out all fields", 400));
  }

  try {
    const intro = await Intro.create({ Heading, title, description, imageUrl });
    res.status(201).json({
      success: true,
      message: "Intro created successfully",
      intro,
    });
  } catch (error) {
    return next(new ErrorHandler("Error creating intro", 500));
  }
});
// Get All Intros
export const getAllIntros = catchAssyncErrors(async (req, res, next) => {
    try {
      const intros = await Intro.find(); // Fetch all intros from the database
      res.status(200).json({
        success: true,
        message: "Intros fetched successfully",
        intros, // Return the intros array
      });
    } catch (error) {
      return next(new ErrorHandler("Error fetching intros", 500));
    }
  });
  


// Get Intro by ID
export const getIntroById = catchAssyncErrors(async (req, res, next) => {
    const { id } = req.params; // Extract ID from the request parameters
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid ID format", 400)); // Check if ID is valid
    }
  
    try {
      const intro = await Intro.findById(id); // Fetch the intro by ID
  
      if (!intro) {
        return next(new ErrorHandler("Intro not found", 404)); // Handle case when intro is not found
      }
  
      res.status(200).json({
        success: true,
        message: "Intro fetched successfully",
        intro, // Return the specific intro
      });
    } catch (error) {
      return next(new ErrorHandler("Error fetching intro", 500)); // Handle server errors
    }
  });
  

// Update Intro
// Update Intro
export const updateIntro = catchAssyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { Heading, title, description, imageUrl } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format", 400));
  }

  try {
    const intro = await Intro.findByIdAndUpdate(id, { Heading, title, description, imageUrl }, { new: true });

    if (!intro) {
      return next(new ErrorHandler("Intro not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Intro updated successfully",
      intro,
    });
  } catch (error) {
    return next(new ErrorHandler("Error updating intro", 500));
  }
});
// Delete Intro
export const deleteIntro = catchAssyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format", 400));
  }

  try {
    const intro = await Intro.findByIdAndDelete(id);

    if (!intro) {
      return next(new ErrorHandler("Intro not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Intro deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Error deleting intro", 500));
  }
});

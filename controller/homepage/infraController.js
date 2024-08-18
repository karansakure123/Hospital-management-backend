import mongoose from 'mongoose';
import Infrastructure from '../../models/homepage/infraSchma.js';
import { catchAssyncErrors } from '../../middlewares/catchAssyncErrors.js';
import ErrorHandler from "../../middlewares/errorMiddleware.js";

// Create Infrastructure Section
export const createInfrastructure = catchAssyncErrors(async (req, res, next) => {
  const { heading, leftImage, images, description } = req.body;

  // Validate required fields
  if (!heading) {
    return next(new ErrorHandler("Section title is required", 400));
  }

  if (!leftImage) {
    return next(new ErrorHandler("Left image URL is required", 400));
  }

  if (!images || !Array.isArray(images) || images.length < 1) {
    return next(new ErrorHandler("At least one image URL is required", 400));
  }

  try {
    const section = await Infrastructure.create({ heading, leftImage, images, description });
    res.status(201).json({
      success: true,
      message: "Section created successfully",
      section,
    });
  } catch (error) {
    console.error("Error creating section:", error);
    return next(new ErrorHandler("Error creating section", 500));
  }
});

// Get All Infrastructures
export const getAllInfrastructures = catchAssyncErrors(async (req, res, next) => {
  try {
    const infrastructures = await Infrastructure.find();

    res.status(200).json({
      success: true,
      infrastructures,
    });
  } catch (error) {
    return next(new ErrorHandler("Error fetching infrastructures", 500));
  }
});

// Get Infrastructure by ID
export const getInfrastructureById = catchAssyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format", 400));
  }

  try {
    const infrastructure = await Infrastructure.findById(id);

    if (!infrastructure) {
      return next(new ErrorHandler("Infrastructure not found", 404));
    }

    res.status(200).json({
      success: true,
      infrastructure,
    });
  } catch (error) {
    return next(new ErrorHandler("Error fetching infrastructure", 500));
  }
});

// Update Infrastructure
export const updateInfrastructure = catchAssyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { heading, leftImage, images, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format", 400));
  }

  try {
    const infrastructure = await Infrastructure.findByIdAndUpdate(id, { heading, leftImage, images, description }, { new: true });

    if (!infrastructure) {
      return next(new ErrorHandler("Infrastructure not found", 404));
    }

    res.status(200).json({
      success: true,
      infrastructure,
    });
  } catch (error) {
    return next(new ErrorHandler("Error updating infrastructure", 500));
  }
});

// Delete Infrastructure
export const deleteInfrastructure = catchAssyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format", 400));
  }

  try {
    const infrastructure = await Infrastructure.findByIdAndDelete(id);

    if (!infrastructure) {
      return next(new ErrorHandler("Infrastructure not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Infrastructure deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Error deleting infrastructure", 500));
  }
});

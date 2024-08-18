import mongoose from 'mongoose';
import WhoWeAre from '../../models/homepage/whoWeSchema.js';
import { catchAssyncErrors } from '../../middlewares/catchAssyncErrors.js';
import ErrorHandler from "../../middlewares/errorMiddleware.js";

// Create "Who We Are"
export const createWhoWeAre = catchAssyncErrors(async (req, res, next) => {
  const { sectionTitle, para1, para2, para3, buttonLabel } = req.body;

  if (!sectionTitle) {
    return next(new ErrorHandler("Section title is required", 400));
  }

  if (!para1 || !buttonLabel) {
    return next(new ErrorHandler("Please provide the required fields", 400));
  }

  try {
    const whoWeAre = await WhoWeAre.create({ sectionTitle, para1, para2, para3, buttonLabel });
    res.status(201).json({
      success: true,
      message: "Who We Are section created successfully",
      whoWeAre,
    });
  } catch (error) {
    return next(new ErrorHandler("Error creating Who We Are section", 500));
  }
});

// Get All "Who We Are" sections
export const getAllWhoWeAre = catchAssyncErrors(async (req, res, next) => {
  try {
    const whoWeAreSections = await WhoWeAre.find();
    res.status(200).json({
      success: true,
      message: "Who We Are sections fetched successfully",
      whoWeAreSections,
    });
  } catch (error) {
    return next(new ErrorHandler("Error fetching Who We Are sections", 500));
  }
});

// Get "Who We Are" by ID
export const getWhoWeAreById = catchAssyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format", 400));
  }

  try {
    const whoWeAre = await WhoWeAre.findById(id);

    if (!whoWeAre) {
      return next(new ErrorHandler("Who We Are section not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Who We Are section fetched successfully",
      whoWeAre,
    });
  } catch (error) {
    return next(new ErrorHandler("Error fetching Who We Are section", 500));
  }
});

// Update "Who We Are"
export const updateWhoWeAre = catchAssyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { sectionTitle, para1, para2, para3, buttonLabel } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format", 400));
  }

  if (!sectionTitle || !para1 || !buttonLabel) {
    return next(new ErrorHandler("Please provide the required fields", 400));
  }

  try {
    const whoWeAre = await WhoWeAre.findByIdAndUpdate(
      id,
      { sectionTitle, para1, para2, para3, buttonLabel },
      { new: true }
    );

    if (!whoWeAre) {
      return next(new ErrorHandler("Who We Are section not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Who We Are section updated successfully",
      whoWeAre,
    });
  } catch (error) {
    return next(new ErrorHandler("Error updating Who We Are section", 500));
  }
});

// Delete "Who We Are"
export const deleteWhoWeAre = catchAssyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format", 400));
  }

  try {
    const whoWeAre = await WhoWeAre.findByIdAndDelete(id);

    if (!whoWeAre) {
      return next(new ErrorHandler("Who We Are section not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Who We Are section deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Error deleting Who We Are section", 500));
  }
});

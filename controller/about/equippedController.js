import Equipped from "../../models/about/eqpAndCorp_Sechema.js"
import upload from "../../middlewares/multer.js";
import express from "express";
 

// Api for Corporate  of about section  

export const createEquipped = async (req, res, next) => {
  try {
    const { eqpHeading, eqpTitle } = req.body;
    const eqpImg = req.file ? req.file.path : req.body.eqpImg;

    if (!eqpImg) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const equipped = new Equipped({
      eqpHeading,
      eqpTitle,
      eqpImg
    });

    await equipped.save();

    res.status(200).json({
      success: true,
      message: "New Equipped Section Created 👍",equipped
    });
  } catch (error) {
    console.error("Error creating equipped section:", error);
    res.status(400).json({ success: false, message: error.message || "An error occurred" });
  }
};

export const getEquipped = async (req, res) => {
  try {
    const equipped = await Equipped.find();
    res.status(200).json({ success: true, message: "Equipped fetched successfully ", equipped });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
export const getEquippedById = async (req, res) => {
  const { id } = req.params;
  try {
    const equipped = await Equipped.findById(id);
    if (!equipped) {
      res.status.json({ success: false, message: "Equipped not found" });
    }
    res.status(200).json({ success: true, message: "Equipped fetched successfully ",equipped });
  } catch (error) {
    res.status.json({ success: false, message: error.message });
  }
};

export const updateEquipped = async (req, res) => {
  const { id } = req.params;
  const { eqpHeading, eqpTitle, eqpImg } = req.body;

  // Regular expression to validate image URLs
  const imageUrlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/i;

  // Validate the eqpImg URL
  if (eqpImg && !imageUrlPattern.test(eqpImg)) {
    return res.status(400).json({ success: false, message: "Invalid image URL provided!" });
  }

  try {
    const updateData = {
      eqpHeading,
      eqpTitle,
      eqpImg,
    };

    if (req.data) {
      updateData.eqpImg = req.file.path;
    }

    const updateEquipped = await Equipped.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateEquipped) {
      return res.status(400).json({ success: false, message: "Equipped not found" });
    }

    return res.status(200).json({ success: true, message: "Equipped Section updated successfully", updateEquipped });
  } catch (error) {
    console.error("Error updating Equipped", error);
    return res.status(400).json({ success: false, message: error });
  }
};
export const deleteEquipped = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteEquipped = await Equipped.findByIdAndDelete(id);
    if (!deleteEquipped) {
      return res
        .status(400)
        .json({ success: false, message: " Equipped not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Equipped Deleted Successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "error deleting api 🥲 " + error.message });
  }
};

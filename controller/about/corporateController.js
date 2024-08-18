import Corporate from "../../models/about/CorporateSchema.js"
import upload from "../../middlewares/multer.js";
 

// Api for Corporate  of about section  

export const createCorporate = async (req, res) => {
  try {
    const { corpHeading, corpDetail } = req.body;
    const corpImg = req.file ? req.file.path : req.body.corpImg;

    if (!corpImg) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const corporate = new Corporate({
      corpHeading,
      corpDetail,
      corpImg
    });

    await corporate.save();

    res.status(200).json({
      success: true,
      message: "New Corporate Section Created 👍",corporate
    });
  } catch (error) {
    console.error("Error creating corporate section:", error);
    res.status(400).json({ success: false, message: error.message || "An error occurred" });
  }
};



export const getCorporate = async (req, res) => {
  try {
    const corporate = await Corporate.find();
    res.status(200).json({ success: true, message :"Corporate Data fetched successfully",corporate });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};



export const getCorporateById = async (req, res) => {
  const { id } = req.params;
  try {
    const corporate = await Corporate.findById( id );
    if (!corporate) {
      res.status.json({ success: false, message: "Corporate not found" });
    }
    res.status(200).json({ success: true, message:"Corporate fetched sucessfully", corporate });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const updateCorporate = async (req, res) => {
  const { id } = req.params;
  const { corpHeading, corpDetail, corpImg } = req.body;

  try {
    // Simple image format validation
    const isValidImageUrl = (url) => {
      const validExtensions = /\.(png|jpg|jpeg|webp)$/i; // allowed image extensions
      return validExtensions.test(url); // check if URL ends with valid extensions
    };

    // Validate the image URL
    if (corpImg && !isValidImageUrl(corpImg)) {
      return res.status(400).json({
        success: false,
        message: "Invalid image URL. Please provide a URL that ends with .png, .jpg, .jpeg, or .webp",
      });
    }

    const updateData = {
      corpHeading,
      corpDetail,
    };

    // Check if a new file is uploaded
    if (req.file) {
      updateData.corpImg = req.file.path; // Use the uploaded file path
      console.log("Updated image path:", req.file.path);
    } else if (!corpImg) {
      // If no new file is uploaded and no existing image in request body, return an error
      return res.status(400).json({
        success: false,
        message: "Image is required for updating corporate",
      });
    } else {
      // If an image URL is provided, assign it
      updateData.corpImg = corpImg;
    }

    const updateCorporate = await Corporate.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateCorporate) {
      return res.status(400).json({ success: false, message: "Corporate not found" });
    }

    return res.status(200).json({ success: true, message: "Corporate Section updated", updateCorporate });
  } catch (error) {
    console.error("Error updating Corporate", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};


export const deleteCorporate = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCorporate = await  Corporate.findByIdAndDelete(id);
    if (!deleteCorporate) {
      return res
        .status(400)
        .json({ success: false, message: "Corporate not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Corporate Deleted Successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "error deleting api 🥲 " + error.message });
  }
};

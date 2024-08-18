 import Director from "../../models/about/directorSchema.js"
import upload from "../../middlewares/multer.js";
 

export const createDirector = async (req, res) => {
  try {
    const { dircHeading, dircSpeciality } = req.body;
    const dircImg = req.file ? req.file.path : req.body.dircImg;

    if (!dircImg) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const director = new Director({
      dircHeading,
      dircSpeciality,
      dircImg
    });

    await director.save();

    res.status(200).json({
      success: true,
      message: "New Director Created 👍",director
    });
  } catch (error) {
    console.error("Error creating director:", error);
    res.status(400).json({ success: false, message: error.message || "An error occurred" });
  }
};

export const getDirector = async (req, res) => {
  try {
    const director = await Director.find();
    res.status(200).json({ success: true, message: "director fetch successfully",director });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};


export const getDirectorById = async (req, res) => {
  const { id } = req.params;
  
  try {
    let director;
    if (id) {
      director = await Director.findById(id);
      if (!director) {
        return res.status(404).json({ success: false, message: "Director not found" });
      }
    } else {
      director = await Director.find();
    }
    
    res.status(200).json({ success: true, message: "Director(s) fetched successfully", director });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateDirector = async (req, res) => {
  const { id } = req.params;
  const { dircHeading, dircSpeciality ,dircImg} = req.body;

  try {
    const updateData = {
        dircHeading,
        dircSpeciality,
        dircImg
    
    };

    if (req.data) {
      updateData.dircImg = req.file.path;
    }
    const updateDirector = await Director.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateDirector) {
      return res
        .status(400)
        .json({ success: false, message: "Director not found" });
    }

    return res.status(200).json({ success: true, message: "Director updated successfully",updateData });
  } catch (error) {
    console.error("error updating director", error);
    return res.status(400).json({ success: false, message: error });
  }
};

export const deleteDirector = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteDirector = await Director.findByIdAndDelete(id);
    if (!deleteDirector) {
      return res
        .status(400) // Changed 'tus(400)' to 'status(400)'
        .json({ success: false, message: "AccDirectorrediation not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Director Deleted Successfully" , deleteDirector});
  } catch (error) {
    return res.status(400).json({ success: false, message: "error deleting api 🥲 " + error.message });
  }
};

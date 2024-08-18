import Department from '../models/department.js';
 import upload from "../middlewares/multer.js"
 
// Create a new department
export const createDepartment = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err });
        }
        try {
            const { deptHeading, deptName, deptBtn } = req.body;
            const deptImage = req.file ? req.file.path : req.body.deptImage;

            if (!deptImage) {
                return res.status(400).json({ success: false, message: 'Image is required' });
            }

            const department = new Department({ deptHeading, deptName, deptBtn, deptImage });
            await department.save();
            res.status(201).json({ success: true, department });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    });
};

// Get all departments
export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json({ success: true, departments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get department by ID
export const getDepartmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const department = await Department.findById(id);
        if (!department) {
            return res.status(404).json({ success: false, message: 'Department not found' });
        }
        res.status(200).json({ success: true, department });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { deptHeading, deptName, deptDescription } = req.body;
    
    try {
         const updateData = {
            deptHeading,
            deptName,
            deptDescription,
        };

         if (req.file) {
            updateData.deptImage = req.file.path; // Use uploaded image path
        }

          const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

         if (!updatedDepartment) {
            return res.status(404).json({ success: false, message: 'Department not found' });
        }
        res.status(200).json({ success: true, updatedDepartment });
    } catch (error) {
        console.error('Error updating department:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Delete a department
export const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDepartment = await Department.findByIdAndDelete(id);
        if (!deletedDepartment) {
            return res.status(404).json({ success: false, message: 'Department not found' });
        }
        res.status(200).json({ success: true, message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
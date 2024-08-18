import mongoose from 'mongoose';
import { catchAssyncErrors } from '../../middlewares/catchAssyncErrors.js';
import ErrorHandler from "../../middlewares/errorMiddleware.js";
import Navbar from "../../models/homepage/navSchema.js";

// Create Navbar
export const createNavBar = catchAssyncErrors(async (req, res, next) => {
    const { navLogo, navItems } = req.body;

    if (!navLogo || !navItems || navItems.length === 0) {
        return next(new ErrorHandler("Please fill full form", 400));
    }

    try {
        const navbar = await Navbar.create({
            navLogo,
            navItems  
        });

        res.status(201).json({
            success: true,
            message: "Navbar Created Successfully",
            navbar
        });
    } catch (error) {
        return next(new ErrorHandler("Error creating navbar", 500));
    }
});

// Get All Navbar Items
export const getNavBar = catchAssyncErrors(async (req, res, next) => {
    try {
        const navbar = await Navbar.find();
        res.status(200).json({
            success: true,
            message: "Navbar fetched",
            navbar
        });
    } catch (error) {
        return next(new ErrorHandler("Error fetching navbar", 500));
    }
});

// Get Navbar Item by ID
export const getNavBarById = catchAssyncErrors(async (req, res, next) => {
    const { id } = req.params; // Extract the ID from the request parameters
    console.log("Fetching navbar item with ID:", id); // Log the ID

    try {
        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new ErrorHandler("Invalid ID format", 400));
        }

        const navbarItem = await Navbar.findOne({ "navItems._id": id }); // Fetch the navbar item by ID

        if (!navbarItem) {
            console.log("Navbar item not found for ID:", id); // Log if not found
            return next(new ErrorHandler("Navbar item not found", 404)); // Handle not found
        }

        // Find the specific nav item
        const navItem = navbarItem.navItems.id(id);

        if (!navItem) {
            return next(new ErrorHandler("Navigation item not found", 404)); // Handle nav item not found
        }

        res.status(200).json({
            success: true,
            message: "Navbar item fetched successfully",
            navItem, // Return the specific nav item
        });
    } catch (error) {
        console.error("Error fetching navbar item:", error); // Log the error
        return next(new ErrorHandler("Error fetching navbar item", 500)); // Handle server error
    }
});

// Update Navbar Item
export const updateNavBar = catchAssyncErrors(async (req, res, next) => {
    const { id } = req.params;  
    const { name, link, className } = req.body;  

    try {
        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid navigation item ID' });
        }

        const navbar = await Navbar.findOne({ "navItems._id": id });  
        if (!navbar) {
            return res.status(404).json({ success: false, message: 'Navbar not found' });
        }

        const navItem = navbar.navItems.id(id);  

        if (!navItem) {
            return res.status(404).json({ success: false, message: 'Navigation item not found' });
        }

        // Update fields if provided
        if (name) navItem.name = name;
        if (link) navItem.link = link;
        if (className) navItem.className = className;

        await navbar.save();

        return res.status(200).json({ success: true, message: 'Navigation item updated successfully', navItem });
    } catch (error) {
        console.error("Error updating navigation item:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Delete Navbar Item
export const deleteNavBar = catchAssyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid navigation item ID' });
        }

        const navbar = await Navbar.findOne({ "navItems._id": id });

        if (!navbar) {
            return res.status(404).json({ success: false, message: 'Navbar not found' });
        }

        const navItemIndex = navbar.navItems.findIndex(item => item._id.toString() === id);

        if (navItemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Navigation item not found' });
        }

        navbar.navItems.splice(navItemIndex, 1); // Remove the nav item

        await navbar.save();

        return res.status(200).json({ success: true, message: 'Navigation item deleted successfully' });
    } catch (error) {
        console.error("Error deleting navigation item:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

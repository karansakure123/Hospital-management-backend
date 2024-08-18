import mongoose from "mongoose";

const navItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    className: {
        type: String,
        default: ''
    }
});

const navSchema = new mongoose.Schema({
    navLogo: {
        type: String,
        required: true
    },
    navItems: [navItemSchema] // Array of nav items
});

const Navbar = mongoose.model("Navbar", navSchema);
export default Navbar;

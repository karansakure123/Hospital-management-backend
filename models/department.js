import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    deptHeading:{
        type:String, 
    },
    deptImage: {
        type: String,
        required: true,  // This should be true if you want to enforce it
    },
    deptName: {
        type: String,
        required: true,
    },
    deptBtn: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);
export default Department;

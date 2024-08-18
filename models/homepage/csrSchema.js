import mongoose from 'mongoose';

const csrSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    heading:{
        type:String,
        required:true,
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const CSR = mongoose.model('CSR', csrSchema);
export default CSR;

import mongoose from "mongoose";

const heroSchema  = mongoose.Schema({
    sliderImg:{
        type:String,
        required:true,
        } 
})
const Hero = mongoose.model("Hero", heroSchema);
export default Hero;
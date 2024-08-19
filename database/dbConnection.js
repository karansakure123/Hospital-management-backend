import mongoose from "mongoose";

export const dbConnection = () => {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
        console.error("MongoDB URI is missing. Please check your .env file.");
        return;
    }

    mongoose.connect(mongoURI, {
        dbName: "hospitals",
    }).then(() => {
        console.log("Connected to database");
    }).catch(err => {
        console.error("Error connecting to database:", err);
    });
};

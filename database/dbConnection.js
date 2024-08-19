// connection.js
import mongoose from 'mongoose';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Function to connect to MongoDB
export const dbConnection = () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error("MongoDB connection string is missing in the environment variables.");
        process.exit(1); // Exit the process if URI is not provided
    }

    mongoose.connect(uri, { dbName: "hospitals", useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
            process.exit(1); // Exit the process on connection error
        });
};

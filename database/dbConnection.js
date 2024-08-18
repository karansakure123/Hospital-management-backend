import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: "hospitals" })
        .then(() => {
            console.log("mongodb connected");
        })
        .catch((e) => console.log(e));
};

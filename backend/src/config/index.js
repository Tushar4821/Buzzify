
import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const dbUri = process.env.MONGODB_URI;

        if (!dbUri) {
            throw new Error("MONGODB_URI is missing from .env");
        }

        await mongoose.connect(dbUri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("Connected to MongoDB successfully");
        console.log(
            "MongoDB ready state:",
            mongoose.connection.readyState
        );
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        throw error;
    }
};

export { connectToDB };

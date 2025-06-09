import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected successfully`);
    } catch (error) {
        console.log(`Error connectng mongoDB ${error}`)
        process.exit(1);
    }
}
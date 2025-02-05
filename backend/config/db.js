import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_KEY = process.env.MONGODB_URI

export const connectToMongoDB = async () => {
  try {
      await mongoose.connect(MONGODB_KEY);
      console.log('Connected to MongoDB');
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
  }
};
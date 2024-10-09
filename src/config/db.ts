import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = process.env.DB_URL || "mongodb://localhost:27017/demo-pelu";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(connect);
    const url = `${connection.host}:${connection.port}`;
    console.log(`MongoDB connected: ${url}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

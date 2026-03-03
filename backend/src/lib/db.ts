import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(ENV.DB_URL);
    console.log("Connected to database", conn.connection.host);
  } catch (error) {
    console.log("Error while connecting to db", error);
    process.exit(1);
  }
};

// lib/db.ts
require("dotenv").config();
import mongoose from "mongoose";

const MONGODB_CON_STRING = process.env.MONGODB_CON_STRING || "";

if (!MONGODB_CON_STRING) {
  throw new Error("Please define the MONGODB_CON_STRING environment variable inside .env.local");
}

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return mongoose.connection.asPromise();
  try {
    return await mongoose.connect(MONGODB_CON_STRING);
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}




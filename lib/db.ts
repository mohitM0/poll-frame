// lib/db.ts
import mongoose from "mongoose";

const NEXT_PUBLIC_MONGODB_CON_STRING = process.env.NEXT_PUBLIC_MONGODB_CON_STRING || "";

if (!NEXT_PUBLIC_MONGODB_CON_STRING) {
  throw new Error("Please define the NEXT_PUBLIC_MONGODB_CON_STRING environment variable inside .env.local");
}

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return mongoose.connection.asPromise();
  return mongoose.connect(NEXT_PUBLIC_MONGODB_CON_STRING);
}



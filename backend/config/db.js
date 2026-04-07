import mongoose from "mongoose";

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing in backend/.env");
  }

  await mongoose.connect(mongoUri, {
    maxPoolSize: 10,
  });

  console.log("MongoDB connected");
}

export default connectDB;

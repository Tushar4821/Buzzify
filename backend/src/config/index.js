import mongoose from "mongoose";

let connectionPromise = null;

const connectToDB = async () => {
  const dbUri = process.env.MONGODB_URI;

  if (!dbUri) {
    throw new Error("MONGODB_URI is missing");
  }

  // Reuse an already established connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Reuse an ongoing connection attempt
  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(dbUri, {
        serverSelectionTimeoutMS: 10000,
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;

  console.log("Connected to MongoDB successfully");

  return mongoose.connection;
};

export { connectToDB };
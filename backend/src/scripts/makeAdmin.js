
import "dotenv/config";
import mongoose from "mongoose";
import {connectToDB} from "../config/index.js";
import User from "../models/User.js";

const email = process.argv[2]?.trim().toLowerCase();

try {
  if (!email) {
    throw new Error(
      "Please provide the registered user's email address."
    );
  }

  await connectToDB();

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(
      `No user found with email: ${email}`
    );
  }

  user.role = "admin";
  await user.save();

  console.log(`Successfully promoted ${user.email} to admin.`);
} catch (error) {
  console.error("Admin promotion failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}

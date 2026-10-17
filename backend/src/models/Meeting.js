import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },

    company: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    service: {
      type: String,
      required: [true, "Please specify the service you need"],
      trim: true,
      maxlength: 150,
    },

    message: {
      type: String,
      required: [true, "Meeting message is required"],
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },

    preferredDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
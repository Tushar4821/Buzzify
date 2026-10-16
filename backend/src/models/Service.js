
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },

    icon: {
      type: String,
      trim: true,
      default: "briefcase-business",
      maxlength: 60,
    },

    features: {
      type: [String],
      default: [],
      validate: {
        validator: (features) =>
          features.length <= 20 &&
          features.every(
            (feature) =>
              typeof feature === "string" &&
              feature.trim().length > 0 &&
              feature.length <= 200
          ),
        message: "A service can have up to 20 valid features.",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;

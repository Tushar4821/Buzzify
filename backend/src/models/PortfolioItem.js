
import mongoose from "mongoose";

const portfolioItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Portfolio title is required"],
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    description: {
      type: String,
      required: [true, "Portfolio description is required"],
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service reference is required"],
      index: true,
    },

    clientName: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    coverImage: {
      type: String,
      trim: true,
      default: "",
    },

    media: {
      type: [String],
      default: [],
      validate: {
        validator: (items) =>
          items.length <= 20 &&
          items.every(
            (item) =>
              typeof item === "string" &&
              item.trim().length > 0 &&
              item.length <= 2048
          ),
        message: "A portfolio item can have up to 20 valid media URLs.",
      },
    },

    projectUrl: {
      type: String,
      trim: true,
      default: "",
      maxlength: 2048,
    },

    results: {
      type: [String],
      default: [],
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PortfolioItem = mongoose.model(
  "PortfolioItem",
  portfolioItemSchema
);

export default PortfolioItem;

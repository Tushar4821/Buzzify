
import mongoose from "mongoose";
import PortfolioItem from "../models/PortfolioItem.js";
import Service from "../models/Service.js";

// CREATE PORTFOLIO ITEM — Admin only
export const createPortfolioItem = async (req, res) => {
  try {
    const {
      title,
      description,
      service,
      clientName,
      coverImage,
      media,
      projectUrl,
      results,
      isFeatured,
      isPublished,
    } = req.body;

    if (!title || !description || !service) {
      return res.status(400).json({
        success: false,
        message: "Title, description and service are required.",
      });
    }

    if (!mongoose.isValidObjectId(service)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID.",
      });
    }

    const serviceExists = await Service.findOne({
      _id: service,
      isActive: true,
    });

    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: "Active service not found.",
      });
    }

    const portfolioItem = await PortfolioItem.create({
      title,
      description,
      service,
      clientName,
      coverImage,
      media,
      projectUrl,
      results,
      isFeatured,
      isPublished,
    });

    return res.status(201).json({
      success: true,
      message: "Portfolio item created successfully.",
      portfolioItem,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create portfolio item.",
    });
  }
};

// GET ALL PUBLISHED PORTFOLIO ITEMS — Public
export const getAllPortfolioItems = async (req, res) => {
  try {
    const portfolioItems = await PortfolioItem.find({
      isPublished: true,
    })
      .populate("service", "title icon")
      .sort({ isFeatured: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: portfolioItems.length,
      portfolioItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio items.",
    });
  }
};

// GET SINGLE PORTFOLIO ITEM — Public
export const getPortfolioItemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio item ID.",
      });
    }

    const portfolioItem = await PortfolioItem.findOne({
      _id: id,
      isPublished: true,
    }).populate("service", "title icon");

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: "Published portfolio item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      portfolioItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio item.",
    });
  }
};

// UPDATE PORTFOLIO ITEM — Admin only
export const updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio item ID.",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "service",
      "clientName",
      "coverImage",
      "media",
      "projectUrl",
      "results",
      "isFeatured",
      "isPublished",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
    }

    if (
      updates.service &&
      !mongoose.isValidObjectId(updates.service)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID.",
      });
    }

    if (updates.service) {
      const serviceExists = await Service.findOne({
        _id: updates.service,
        isActive: true,
      });

      if (!serviceExists) {
        return res.status(404).json({
          success: false,
          message: "Active service not found.",
        });
      }
    }

    const portfolioItem = await PortfolioItem.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate("service", "title icon");

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: "Portfolio item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio item updated successfully.",
      portfolioItem,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update portfolio item.",
    });
  }
};

// DELETE PORTFOLIO ITEM — Admin only
export const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio item ID.",
      });
    }

    const portfolioItem = await PortfolioItem.findByIdAndDelete(id);

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: "Portfolio item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio item deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete portfolio item.",
    });
  }
};

// GET PORTFOLIO BY SERVICE — Public
export const getPortfolioByService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    if (!mongoose.isValidObjectId(serviceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID.",
      });
    }

    const serviceExists = await Service.findOne({
      _id: serviceId,
      isActive: true,
    });

    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: "Active service not found.",
      });
    }

    const portfolioItems = await PortfolioItem.find({
      service: serviceId,
      isPublished: true,
    })
      .populate("service", "title icon")
      .sort({ isFeatured: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      service: serviceExists.title,
      count: portfolioItems.length,
      portfolioItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch service portfolio.",
    });
  }
};

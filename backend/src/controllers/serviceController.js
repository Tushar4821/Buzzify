
import Service from "../models/Service.js";



// CREATE SERVICE
export const createService = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const service = await Service.create({
      title,
      description,
      price,
      category,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL SERVICES
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE SERVICE
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE SERVICE
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE SERVICE
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

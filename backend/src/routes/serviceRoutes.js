
import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import adminMiddleware from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const serviceRouter = express.Router();

// Public routes
serviceRouter.get("/", getAllServices);
serviceRouter.get("/:id", getServiceById);

// Admin-only routes
serviceRouter.post("/", protect, adminMiddleware, createService);
serviceRouter.put("/:id", protect, adminMiddleware, updateService);
serviceRouter.delete("/:id", protect, adminMiddleware, deleteService);

export default serviceRouter;

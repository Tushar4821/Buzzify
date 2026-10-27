
import express from "express";
import {
  createService,
  getAllServices,
  getAllServicesAdmin,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import adminMiddleware from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const serviceRouter = express.Router();

// Public routes
serviceRouter.get("/", getAllServices);

// Admin-only: list all services, including inactive ones.
// Keep this before the /:id route.
serviceRouter.get(
  "/admin/all",
  protect,
  adminMiddleware,
  getAllServicesAdmin
);

serviceRouter.get("/:id", getServiceById);

// Admin-only routes
serviceRouter.post("/", protect, adminMiddleware, createService);
serviceRouter.put("/:id", protect, adminMiddleware, updateService);
serviceRouter.delete("/:id", protect, adminMiddleware, deleteService);

export default serviceRouter;

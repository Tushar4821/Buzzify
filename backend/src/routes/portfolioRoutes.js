
import express from "express";

import {
  createPortfolioItem,
  getAllPortfolioItems,
  getPortfolioItemById,
  updatePortfolioItem,
  deletePortfolioItem,
  getPortfolioByService,
} from "../controllers/portfolioController.js";

import { protect } from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const portfolioRouter = express.Router();

// Public routes
portfolioRouter.get("/", getAllPortfolioItems);
portfolioRouter.get("/service/:serviceId", getPortfolioByService);
portfolioRouter.get("/:id", getPortfolioItemById);

// Admin-only routes
portfolioRouter.post(
  "/",
  protect,
  adminMiddleware,
  createPortfolioItem
);

portfolioRouter.put(
  "/:id",
  protect,
  adminMiddleware,
  updatePortfolioItem
);

portfolioRouter.delete(
  "/:id",
  protect,
  adminMiddleware,
  deletePortfolioItem
);

export default portfolioRouter;

import express from "express";
import { getAllClients } from "../controllers/userController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin/clients", protect, adminMiddleware, getAllClients);

export default router;
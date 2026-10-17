import express from "express";

import {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeetingStatus,
  deleteMeeting,
} from "../controllers/meetingController.js";

import { protect } from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const meetingRouter = express.Router();

// Public: Submit a meeting request
meetingRouter.post("/", createMeeting);

// Admin: View all meeting requests
meetingRouter.get("/", protect,  adminMiddleware , getAllMeetings);

// Admin: View a specific meeting request
meetingRouter.get("/:id", protect,  adminMiddleware , getMeetingById);

// Admin: Update meeting status
meetingRouter.patch(
  "/:id/status",
  protect,
   adminMiddleware ,
  updateMeetingStatus
);

// Admin: Delete a meeting request
meetingRouter.delete("/:id", protect,  adminMiddleware , deleteMeeting);

export default meetingRouter;
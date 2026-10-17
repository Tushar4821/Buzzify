import Meeting from "../models/Meeting.js";

// @desc    Create a new meeting request
// @route   POST /api/meetings
// @access  Public
export const createMeeting = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      service,
      message,
      preferredDate,
    } = req.body;

    const meeting = await Meeting.create({
      name,
      email,
      phone,
      company,
      service,
      message,
      preferredDate,
      createdBy: req.user?._id || null,
    });

    return res.status(201).json({
      success: true,
      message: "Meeting request submitted successfully",
      meeting,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create meeting request",
    });
  }
};

// @desc    Get all meeting requests
// @route   GET /api/meetings
// @access  Admin
export const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate("createdBy", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: meetings.length,
      meetings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch meeting requests",
    });
  }
};

// @desc    Get a meeting request by ID
// @route   GET /api/meetings/:id
// @access  Admin
export const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id)
      .populate("createdBy", "username email");

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting request not found",
      });
    }

    return res.status(200).json({
      success: true,
      meeting,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid meeting ID",
    });
  }
};

// @desc    Update meeting status
// @route   PATCH /api/meetings/:id/status
// @access  Admin
export const updateMeetingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meeting status",
      });
    }

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Meeting status updated successfully",
      meeting,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update meeting status",
    });
  }
};

// @desc    Delete a meeting request
// @route   DELETE /api/meetings/:id
// @access  Admin
export const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Meeting request deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid meeting ID",
    });
  }
};
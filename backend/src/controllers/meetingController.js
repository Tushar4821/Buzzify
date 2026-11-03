import Meeting from "../models/Meeting.js";
import { sendEmail } from "../services/emailService.js";
import { meetingReceivedTemplate,meetingConfirmedTemplate,meetingRejectedTemplate } from "../services/emailTemplates.js";

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

    // Save meeting request in MongoDB
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

    // Send automatic acknowledgement email
    const emailResult = await sendEmail({
      to: meeting.email,
      subject: "We've received your meeting request | Buzzify",
      html: meetingReceivedTemplate({
        name: meeting.name,
        service: meeting.service,
        preferredDate: meeting.preferredDate,
      }),
    });

    return res.status(201).json({
      success: true,
      message: "Meeting request submitted successfully",
      emailSent: emailResult.success,
      meeting,
    });

  } catch (error) {
    console.error("Create meeting error:", error);

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
    const { status, scheduledDate, scheduledTime } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "rejected",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meeting status",
      });
    }

    // Confirmation requires a final date and time
    if (status === "confirmed") {
      if (
        !scheduledDate ||
        !/^\d{4}-\d{2}-\d{2}$/.test(scheduledDate)
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid meeting date.",
        });
      }

      const [year, month, day] = scheduledDate.split("-").map(Number);
      const dateCheck = new Date(year, month - 1, day);

      if (
        dateCheck.getFullYear() !== year ||
        dateCheck.getMonth() !== month - 1 ||
        dateCheck.getDate() !== day
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid meeting date.",
        });
      }

      if (!scheduledTime || !/^([01]\d|2[0-3]):[0-5]\d$/.test(scheduledTime)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid meeting time.",
        });
      }
    }

    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting request not found",
      });
    }

    const previousStatus = meeting.status;

    // Update meeting information
    meeting.status = status;

    if (status === "confirmed") {
      meeting.scheduledDate = scheduledDate;
      meeting.scheduledTime = scheduledTime;
    }

    await meeting.save();

    let emailSent = null;

    // Send confirmation email only on a new confirmation
    if (status === "confirmed" && previousStatus !== "confirmed") {
      const [year, month, day] = scheduledDate.split("-").map(Number);

      const formattedDate = new Date(year, month - 1, day)
        .toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

      const emailResult = await sendEmail({
        to: meeting.email,
        subject: "Your Buzzify Meeting is Confirmed!",
        html: meetingConfirmedTemplate({
          name: meeting.name,
          service: meeting.service,
          scheduledDate: formattedDate,
          scheduledTime,
        }),
      });

      emailSent = emailResult.success;
    }

    // Send rejection email only on a new rejection
    if (status === "rejected" && previousStatus !== "rejected") {
      const emailResult = await sendEmail({
        to: meeting.email,
        subject: "Update Regarding Your Buzzify Meeting Request",
        html: meetingRejectedTemplate({
          name: meeting.name,
          service: meeting.service,
        }),
      });

      emailSent = emailResult.success;
    }

    return res.status(200).json({
      success: true,
      message: "Meeting status updated successfully",
      emailSent,
      meeting,
    });
  } catch (error) {
    console.error("Update meeting status error:", error);

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
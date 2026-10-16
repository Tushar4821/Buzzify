
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify JWT and authenticate the user
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check whether the token was provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing.",
      });
    }

    // Verify the token using the secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with this token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists. Please log in again.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    // Make the authenticated user available to the next handler
    req.user = user;

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please log in again.",
      });
    }

    console.error("Authentication middleware error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Authentication failed due to a server error.",
    });
  }
};

// Restrict a route to administrators
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }

  next();
};

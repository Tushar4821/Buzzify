import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/index.js";

import authRouter from "./routes/authRoutes.js";
import serviceRouter from "./routes/serviceRoutes.js";
import portfolioRouter from "./routes/portfolioRoutes.js";
import meetingRouter from "./routes/meetingRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// CORS configuration
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        /^http:\/\/localhost:\d+$/.test(origin)
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB before processing API routes
app.use(async (req, res, next) => {
  try {
    await connectToDB();
    next();
  } catch (error) {
    next(error);
  }
});

// API routes
app.use("/api/auth", authRouter);
app.use("/api/service", serviceRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/meeting", meetingRouter);
app.use("/api/users", userRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || [],
  });
});

export default app;
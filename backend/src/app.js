import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express()


//CORS AND CONFIGURATION
app.use(cors({
    origin : (origin, callback) => {
        // Allow request from any local dev origin with credentials
        callback(null, true);
    },
    credentials : true,
}))

app.use(express.json({limit : "10kb"}))
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())


import authRouter from "./routes/authRoutes.js"
import serviceRouter from "./routes/serviceRoutes.js"
import portfolioRouter from "./routes/portfolioRoutes.js"
import meetingRouter from "./routes/meetingRoutes.js"


app.use("/api/auth",authRouter)
app.use("/api/service",serviceRouter)
app.use('/api/portfolio',portfolioRouter)
app.use('/api/meeting',meetingRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || []
    });
});

export default app
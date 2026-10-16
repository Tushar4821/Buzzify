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
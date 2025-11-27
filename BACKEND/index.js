// ================================
// 🌐 Express Server Setup
// ================================

// Importing Dependencies
import express from "express";
import dotenv from "dotenv"; // Load environment variables
import cookieParser from "cookie-parser";  // Parse cookies to server requests as we want to use them for authentication

import cors from "cors"; // Enable CORS which help with cross-origin requests as it allows us to accept requests from a different domain of the frontend

import helmet from "helmet";
import { xssSanitizer } from "./middlewares/xss-sanitization.middleware.js"
import mongoSanitize from "express-mongo-sanitize";
import connectdb from "./database/dbconfig.js";
import { apiLimiter } from "./middlewares/rate-limiting.middleware.js";
import { startTaskCleanupJob } from "./utils/auto-task-deletion.js";
// ================================
// ⚙️ Environment Configuration
// ================================
dotenv.config({ path: "./.env" }); //setting the path to the .env file

// ================================
// 🚀 App Initialization
// ================================
const app = express();

// ================================
// 🧩 Middlewares
// ================================
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded requests
app.use(cookieParser()); // Parse cookies
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173"
app.use(
    cors({
        origin: clientUrl,
        credentials: true, // Allow cookies / credentials
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(helmet());
app.use(xssSanitizer);
// app.use(mongoSanitize({
//     replaceWith: "_",
// })); //prevents attacker from injecting malicious code into the database to manipulate mongodb queries.
// app.use("/api/auth", apiLimiter); // Apply rate limiting middleware to all routes starting with "/api"

// ================================
// 📦 Database Connection
// ===============================
connectdb();

startTaskCleanupJob();



// ================================
// 📍 Basic Route
// ================================
app.get("/", (req, res) => {
    res.status(200).send("✅ Backend server is running successfully!");
});

// ================================
// 📍 Authnetication Routes
// ================================
import authRoutes from "./routes/authentication.routes.js"
app.use("/api/auth", authRoutes);

// ================================
// 📍 Tasks CRUD Routes
// ================================
import taskRoutes from "./routes/task.route.js"
app.use("/api/tasks", taskRoutes);

// ================================
// 🚦 Server Listening
// ================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`⚡ Server is live on: http://localhost:${PORT} and clientUrl is ${clientUrl}`);
});



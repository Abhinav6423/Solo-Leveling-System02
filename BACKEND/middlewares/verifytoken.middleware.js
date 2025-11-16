import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * 🔒 Middleware: Verify JWT Token
 * Purpose:
 * - Check if access token exists in cookies
 * - Verify it using ACCESS_TOKEN_SECRET
 * - Attach user object to req.user (without password)
 */
const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
        // Verify JWT
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find user in DB and exclude password
        const user = await User.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
    }
};

export default verifyToken;

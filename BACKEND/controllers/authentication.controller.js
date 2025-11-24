import User from "../models/user.model.js";
import { updateStreak } from "../utils/streak.js";

/**
 * SANITIZE USER
 */
const sanitizeUser = (user) => ({
    id: user._id,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
    xp: user.xp,
    level: user.level,
    rank: user.rank,
    totalChallenges: user.totalChallenges,
    completedChallenges: user.completedChallenges,
    failedChallenges: user.failedChallenges,
    streak: user.streak,
    totalTasks: user.totalTasks,
    pendingTasks: user.pendingTasks,
    completedTasks: user.completedTasks,
    totalXp: user.totalXp,
});

/**
 * 📌 REGISTER USER
 */
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, profilePic } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all required fields.",
            });
        }

        // Check duplicate
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists.",
            });
        }

        // Create user
        const user = new User({ username, email, password, profilePic });
        await user.save();

        // Init streak
        await updateStreak(user._id);

        // Token
        const token = user.generateAccessToken();

        // Cookie
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: sanitizeUser(user),
            token,
        });

    } catch (err) {
        console.error("Register Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

/**
 * 📌 LOGIN USER
 */
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields.",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        const updatedUser = await updateStreak(user._id);

        // Token
        const token = user.generateAccessToken();

        // Cookie
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully.",
            user: sanitizeUser(updatedUser),
            token,
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

/**
 * 📌 LOGOUT USER
 */
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully.",
        });

    } catch (err) {
        console.error("Logout Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

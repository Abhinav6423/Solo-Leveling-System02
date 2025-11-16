import User from "../models/user.model.js";
import { updateStreak } from "../utils/streak.js";

/**
 * 📌 REGISTER USER
 * - Create user
 * - Initialize streak
 * - Generate JWT
 * - Store token in HTTP-only cookie
 */
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, profilePic } = req.body;

        // 1. Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }

        // 2. Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // 3. Create new user
        const user = new User({ username, email, password, profilePic });
        await user.save();

        // 4. Initialize streak for the new user
        await updateStreak(user._id);

        // 5. Generate JWT token
        const accessToken = user.generateAccessToken();

        // 6. Store token in secure HTTP-only cookie
        res.cookie("access_token", accessToken, {
            httpOnly: true, // ❗Frontend cannot access this cookie (secure)
            secure: process.env.NODE_ENV === "production", // ❗HTTPS only in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ❗Required for cross-site cookies
            maxAge: 24 * 60 * 60 * 1000,
            path: "/", // ❗Cookie available to ALL routes
        });

        // 7. Response back to frontend
        res.status(201).json({
            success: true,
            message: "✅ User registered successfully",
            user: sanitizeUser(user),
            token: accessToken, // (Optional: useful in dev)
        });

    } catch (error) {
        console.error("❌ Error registering user:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


/**
 * 📌 LOGIN USER
 * - Validate credentials
 * - Verify password
 * - Update streak
 * - Generate JWT
 * - Set secure cookie
 */
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate fields
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }

        // 2. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 3. Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // 4. Update streak for the day
        const updatedUser = await updateStreak(user._id);

        // 5. Generate JWT token
        const accessToken = user.generateAccessToken();

        // 6. Store JWT in secure cookie
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });

        // 7. Send response
        res.status(200).json({
            success: true,
            message: "✅ User logged in successfully",
            user: sanitizeUser(updatedUser),
            token: accessToken,
        });

    } catch (error) {
        console.error("❌ Error logging in user:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


/**
 * 📌 LOGOUT USER
 * - Clear the cookie using the SAME settings used when creating it
 */
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/", // ❗Must match to delete cookie
        });

        res.status(200).json({ success: true, message: "✅ User logged out successfully" });

    } catch (error) {
        console.error("❌ Error logging out user:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


/**
 * 📌 Helper: Remove sensitive fields before sending to frontend
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

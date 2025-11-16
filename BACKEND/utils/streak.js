import User from "../models/user.model.js";
import dayjs from "dayjs";

export const updateStreak = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const now = dayjs(); // dayjs() returns an object containing the current date and that obj is stored in the variable now to be used later for comparisons
        const lastLogin = user.streak?.lastLogin ? dayjs(user.streak.lastLogin) : null;

        // 🧩 Case 1 — First ever check-in
        if (!lastLogin) {
            user.streak.current = 1;
            user.streak.longest = 1;

            user.xp += 10;
            user.totalXpEarned += 10;
        }

        // 🧩 Case 2 — Checked in yesterday → increase streak
        else if (now.diff(lastLogin, "day") === 1) {
            user.streak.current += 1;

            user.xp += 10;

            if (user.streak.current > user.streak.longest) {
                user.streak.longest = user.streak.current;


            }
        }

        // 🧩 Case 3 — Already checked in today → ignore
        else if (now.diff(lastLogin, "day") === 0) {
            return user; // no update needed
        }

        // 🧩 Case 4 — Missed a day → reset streak
        else {
            user.streak.current = 1;
        }

        // Update last check-in date
        user.streak.lastLogin = now.toDate();

        await user.save();

        return user; // ✅ return updated user instead of using res
    } catch (error) {
        console.error("❌ Error updating streak:", error.message);
        throw new Error("Failed to update streak");
    }
};

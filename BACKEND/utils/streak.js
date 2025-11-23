import User from "../models/user.model.js";
import dayjs from "dayjs";

export const updateStreak = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const now = dayjs();
        const lastLogin = user.streak?.lastLogin
            ? dayjs(user.streak.lastLogin)
            : null;

        // 🚀 CASE 1: First ever login (initial) → Streak stays 0
        if (!lastLogin) {
            user.streak.current = 0;     // start at 0
            user.streak.longest = 0;
            user.streak.lastLogin = now.toDate();

            await user.save();
            return user;
        }

        // 🚀 CASE 2: Logged in yesterday → Increase streak
        if (now.diff(lastLogin, "day") === 1) {
            // from 0 → becomes 1 (this is what you wanted)
            user.streak.current += 1;

            // give XP
            user.xp += 10;

            // update longest streak
            if (user.streak.current > user.streak.longest) {
                user.streak.longest = user.streak.current;
            }
        }

        // 🚀 CASE 3: Logged in today → do nothing
        else if (now.diff(lastLogin, "day") === 0) {
            return user;
        }

        // 🚀 CASE 4: Missed a day → Reset to 1 (NOT 0)
        else {
            user.streak.current = 1;   // Restart at 1
        }

        // Update lastLogin
        user.streak.lastLogin = now.format("DD MMM YYYY");


        await user.save();

        return user;

    } catch (error) {
        console.error("❌ Error updating streak:", error.message);
        throw new Error("Failed to update streak");
    }
};

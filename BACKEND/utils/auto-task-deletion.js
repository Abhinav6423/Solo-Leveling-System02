import Task from "../models/tasks.model.js";
import cron from "node-cron";
import User from "../models/user.model.js";

export const startTaskCleanupJob = () => {
    // Runs every 10 seconds (for testing)
    cron.schedule("0 * * * *", async () => {
        console.log("🕒 Running cleanup job at:", new Date().toLocaleTimeString());

        const now = new Date();
        const expiredTasks = await Task.find({
            createdAt: { $lte: new Date(now - 24 * 60 * 60 * 1000) }, // older than 24 hours
        });

        for (const task of expiredTasks) {
            try {
                if (!task.completed) {
                    // Update user stats safely
                    await User.findOneAndUpdate(
                        { _id: task.user },
                        [
                            {
                                $set: {
                                    xp: { $max: [{ $subtract: ["$xp", 10] }, 0] },
                                    totalXpEarned: { $max: [{ $subtract: ["$totalXpEarned", 10] }, 0] },
                                    pendingTasks: { $max: [{ $subtract: ["$pendingTasks", 1] }, 0] },
                                    failedTasks: { $add: ["$failedTasks", 1] },
                                },
                            },
                        ],
                        { new: true }
                    );

                }

                // Delete the task regardless of completion
                await Task.findByIdAndDelete(task._id);
                console.log(`🗑️ Deleted expired task: ${task.title}`);
            } catch (err) {
                console.error(`❌ Error deleting task ${task._id}:`, err);
            }
        }
    });

    console.log("✅ Task cleanup cron job started!");
};

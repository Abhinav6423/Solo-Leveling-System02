import Task from "../models/tasks.model.js";
import Subtask from "../models/subtask.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";


export const createTask = async (req, res) => {

    try {
        const { title, description, difficulty, impactOnGoal, urgency } = req.body;

        if (!title || !difficulty || !impactOnGoal || !urgency) {
            return res.status(400).json({ success: false, message: "Title and information of the task is required" });
        }


        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
        }


        const task = new Task(
            {
                title,
                description,
                user: req.user._id,
                difficulty: difficulty,
                impactOnGoal: impactOnGoal,
                urgency: urgency
            }
        )

        await task.save();




        res.status(201).json({ success: true, message: "✅Task created successfully", task });
    } catch (error) {
        console.error("❌ Error creating task:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const getTasks = async (req, res) => {
    try {
        const { status, withSubtasks, sortByXp } = req.query;

        // Base query -> only tasks for the logged-in user
        const query = { user: req.user._id };

        // Filter by status
        if (status) {
            if (status === "completed") query.completed = true;
            else if (status === "pending") query.completed = false;
        }

        // Filter by subtasks
        if (withSubtasks === "true") {
            query.subtasks = { $exists: true, $ne: [] };
        }

        // Fetch tasks based on query
        let taskQuery = Task.find(query);

        // Sort by XP
        if (sortByXp) {
            const sortOrder = sortByXp === "asc" ? 1 : -1;
            taskQuery = taskQuery.sort({ xp: sortOrder });
        }

        // Execute query
        const tasks = await taskQuery;

        res.status(200).json({
            success: true,
            message: "✅ Tasks fetched successfully",
            count: tasks.length,
            tasks,
        });

    } catch (error) {
        console.error("❌ Error fetching tasks:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user._id;

        // 1️⃣ Validate taskId
        if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ success: false, message: "Invalid Task ID" });
        }

        // 2️⃣ Find the task first to verify ownership
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        // 3️⃣ Check if the logged-in user owns this task
        if (task.user.toString() !== userId.toString()) {
            return res.status(401).json({ success: false, message: "Unauthorized: You cannot delete this task" });
        }

        // 4️⃣ Delete the task
        await task.deleteOne();

        // 5️⃣ Prepare XP and stat adjustments for user
        const incObj = { $inc: {} };

        if (task.completed) {
            incObj.$inc.completedTasks = -1;
            incObj.$inc.totalTasks = -1;
            incObj.$inc.totalXp = -task.xp;
            incObj.$inc.xp = -task.xp;
        } else {
            incObj.$inc.pendingTasks = -1;
            incObj.$inc.totalXp = -task.xp;
            incObj.$inc.totalTasks = -1;
        }

        // 6️⃣ Update user stats
        const user = await User.findByIdAndUpdate(task.user, incObj, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 7️⃣ Send success response
        res.status(200).json({
            success: true,
            message: "✅ Task deleted successfully",
        });
    } catch (error) {
        console.error("❌ Error deleting task:", error.message);
        res.status(500).json({ success: false, message: "Internal server error while deleting task" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const { title, description, difficulty, impactOnGoal, urgency } = req.body;

        if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ success: false, message: "Invalid Task ID" });
        }

        if (!title && !description && !difficulty && !impactOnGoal && !urgency) {
            return res.status(400).json({ success: false, message: "Some information of the task is required" });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ success: false, message: "Unauthorized: You cannot update this task" });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (difficulty) task.difficulty = difficulty;
        if (impactOnGoal) task.impactOnGoal = impactOnGoal;
        if (urgency) task.urgency = urgency;

        await task.save();

        res.status(200).json({
            success: true,
            message: "✅ Task updated successfully",
            task
        });
    } catch (error) {
        console.error("❌ Error updating task:", error.message);
        res.status(500).json({ success: false, message: "Internal server error while updating task" });
    }
}


export const isCompleted = async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ success: false, message: "Invalid Task ID" });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        task.completed = !task.completed;
        await task.save();

        const incObj = {
            $inc: {}
        };

        if (task.completed) {
            incObj.$inc.completedTasks = 1;
            incObj.$inc.pendingTasks = -1;
            incObj.$inc.xp = task.xp;
            incObj.$inc.totalXpEarned = task.xp
        } else {
            incObj.$inc.pendingTasks = 1;
            incObj.$inc.completedTasks = -1;
            incObj.$inc.xp = -task.xp
            incObj.$inc.totalXpEarned = -task.xp
        }

        // Update user stats
        const user = await User.findOneAndUpdate(
            { _id: task.user },
            incObj,
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.xp >= user.xpToNextlevel) {
            user.level += 1;
            user.xpToNextlevel = Math.floor(user.xpToNextlevel * 1.5);
            user.xp = Math.max(0, user.xp - user.xpToNextlevel);
            await user.save();
        }





        res.status(200).json({ success: true, message: "✅Task status updated successfully" });

    } catch (error) {
        console.error("❌ Error updating task status:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}






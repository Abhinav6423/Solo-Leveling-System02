import Subtask from "../models/subtask.model.js";
import Task from "../models/tasks.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import { isCompleted } from "./task.controller.js";

export const createSubtask = async (req, res) => {
    const { title, description } = req.body;
    const { taskId } = req.params;

    if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ success: false, message: "Invalid Task ID" });
    }

    if (!title) {
        return res.status(400).json({ success: false, message: "Title of the task is required" });
    }

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        const subtask = new Subtask(
            {
                title: title,
                description: description,
                parentTask: task._id,
                parentTaskTitle: task.title,
                user: task.user
            }
        )

        await subtask.save();

        task.subtasks.push(subtask._id);
        await task.save();

        return res.status(201).json({
            success: true,
            message: "Subtask created successfully",
            subtask: {
                _id: subtask._id,
                title: subtask.title,
                description: subtask.description,
                parentTask: subtask.parentTask,
                parentTaskTitle: task.title
            }
        });
    } catch (error) {
        console.error("❌ Error creating subtask:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getAllSubtasks = async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ success: false, message: "Invalid Task ID" });
        }

        const subtasks = await Subtask.find({ parentTask: taskId });

        return res.status(200).json({
            success: true,
            message: "Subtasks fetched successfully",
            subtasks
        })


    } catch (error) {
        console.error("❌ Error fetching subtasks:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteSubtask = async (req, res) => {
    try {
        const { subtaskId } = req.params;

        if (!subtaskId || !mongoose.Types.ObjectId.isValid(subtaskId)) {
            return res.status(400).json({ success: false, message: "Invalid Subtask ID" });
        }

        // Pull subtask from parent task in a single operation
        const subtask = await Subtask.findById(subtaskId);
        if (!subtask) {
            return res.status(404).json({ success: false, message: "Subtask not found" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            subtask.parentTask,
            { $pull: { subtasks: subtask._id } },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Parent task not found" });
        }

        // Delete the subtask
        await Subtask.findByIdAndDelete(subtaskId);

        res.status(200).json({ success: true, message: "Subtask deleted successfully" });

    } catch (error) {
        console.error("❌ Error deleting subtask:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const updateSubtask = async (req, res) => {
    try {
        const { subtaskId } = req.params;
        const { title, description } = req.body;

        if (!subtaskId || !mongoose.Types.ObjectId.isValid(subtaskId)) {
            return res.status(400).json({ success: false, message: "Invalid Subtask ID" });
        }

        if (!title && !description) {
            return res.status(400).json({ success: false, message: "Title of the subtask is required" });
        }

        const subtask = await Subtask.findByIdAndUpdate(
            subtaskId,
            {
                title: title,
                description: description
            },
            { new: true }
        );

        if (!subtask) {
            return res.status(404).json({ success: false, message: "Subtask not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Subtask updated successfully",
            subtask: {
                _id: subtask._id,
                title: subtask.title,
                description: subtask.description,
                parentTask: subtask.parentTask,
                parentTaskTitle: subtask.parentTaskTitle
            }
        });

    } catch (error) {
        console.error("❌ Error updating subtask:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });

    }
}

export const  isCompletedSubtask = async (req, res) => {
    try {
        const { subtaskId } = req.params;

        const subtask = await Subtask.findById(subtaskId);

        if (!subtask) {
            return res.status(404).json({ success: false, message: "Subtask not found" });
        }

        subtask.completed = !subtask.completed;
        await subtask.save();

        res.status(200).json({ success: true, message: "Subtask completed successfully" });
    } catch (error) {
        console.error("❌ Error completing subtask:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


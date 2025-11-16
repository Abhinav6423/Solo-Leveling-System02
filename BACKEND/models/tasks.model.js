import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        difficulty: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            default: 1
        },

        impactOnGoal: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            default: 1
        },

        urgency: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            default: 1
        },

        completed: {
            type: Boolean,
            default: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Low'

        },
        xp: {
            type: Number,
            default: 0
        },
        subtasks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Subtask",
            },
        ],
    },
    {
        timestamps: true
    }
)

taskSchema.index({ user: 1, completed: 1, xp: -1, createdAt: -1 });



taskSchema.pre("save", function (next) {
    this._wasNew = this.isNew;
    next();
})

// priority system setter 

taskSchema.pre("save", async function (next) {

    try {
        const userId = this.user;

        const priority = (
            (this.difficulty * 0.4) +
            (this.impactOnGoal * 0.4) +
            (this.urgency * 0.2)

        )


        if (priority >= 4) {
            this.priority = "High";
            this.xp = 20;
        } else if (priority >= 2.5) {
            this.priority = "Medium";
            this.xp = 10;
        } else {
            this.priority = "Low";
            this.xp = 5;
        }

        next();
    } catch (error) {
        console.error("Error updating stats on pre save:", error);
        next(error);
    }
})

//after task creation user stats are updated like totalxp , pending tasks etc.
taskSchema.post("save", async function (doc) {
    try {
        if (!this._wasNew) return;

        await User.findByIdAndUpdate(doc.user, {
            $inc: {
                totalXp: doc.xp,
                pendingTasks: 1,
                totalTasks: 1
            }
        });
    } catch (error) {
        console.error("Error updating stats on post save:", error);
    }
})

// this is for level system which checks if the task was completed and returns that task was completed and not a new task because in post save you cannot access isNew and isModified.
taskSchema.pre("save", function (next) {
    this._wasCompleted = this.isModified("completed") && !this.isNew;
    next();
})

//level system
taskSchema.post("save", async function () {
    if (!this._wasCompleted) return;
    try {
        const user = await User.findById(this.user);

        if (!user) {
            console.warn(`User ${this.user} not found when updating task stats after save`);
            return;
        }

        if (user.level >= 100) {
            user.rank = "Expert";
        } else if (user.level >= 50) {
            user.rank = "Advanced";
        } else if (user.level >= 25) {
            user.rank = "Intermediate";
        } else {
            user.rank = "Beginner";
        }

        await user.save();

    } catch (error) {
        console.error("Error updating stats on post save:", error);
        return
    }
})


const Task = mongoose.model("Task", taskSchema);
export default Task;


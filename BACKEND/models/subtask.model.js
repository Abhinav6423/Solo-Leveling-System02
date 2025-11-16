import mongoose, { Schema } from "mongoose";

const subtaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "", // optional
    },
    completed: {
        type: Boolean,
        default: false,
    },
    parentTask: { // reference to parent task
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    user: { // same user as the main task
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

const Subtask = mongoose.model("Subtask", subtaskSchema);
export default Subtask;

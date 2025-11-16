import express from "express"
import { createTask, getTasks, deleteTask, isCompleted , updateTask } from "../controllers/task.controller.js"
import verifyToken from "../middlewares/verifytoken.middleware.js";
import { leaderBoard } from "../controllers/leaderBoard.controller.js";
import { createSubtask, getAllSubtasks, deleteSubtask , updateSubtask , isCompletedSubtask } from "../controllers/subtasks.controller.js";


const router = express.Router();

router.post("/create", verifyToken, createTask)
router.get("/list-tasks", verifyToken, getTasks)
router.delete("/delete/:taskId", verifyToken, deleteTask)
router.patch("/update/:taskId" , verifyToken, updateTask)
router.put("/isCompleted/:taskId", verifyToken, isCompleted)
router.get("/leaderboard", verifyToken, leaderBoard)
router.post("/create-subtask/:taskId", verifyToken, createSubtask)
router.get("/get-subtasks/:taskId", verifyToken, getAllSubtasks)
router.delete("/delete-subtask/:subtaskId", verifyToken, deleteSubtask)
router.patch("/update-subtask/:subtaskId", verifyToken, updateSubtask)
router.put("/isCompletedSubtask/:subtaskId",verifyToken, isCompletedSubtask)



export default router;
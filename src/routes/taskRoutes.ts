import express from "express";
import { createTask, getTasks, updateTask } from "../controller/taskController";

const router = express.Router();

router.post("/tasks", createTask);
router.get("/gettasks", getTasks);
router.put("/tasks/:id", updateTask);

export default router;

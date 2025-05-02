import express from "express";
import { createTask, getTasks, updateTask } from "../controller/taskController";

const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks/project/:project", getTasks);  
router.put("/tasks/:id", updateTask);

export default router;

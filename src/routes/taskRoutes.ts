import express from "express";
import { createTask, getTasks, updateTask } from "../controller/taskController";

const router = express.Router();

router.post("/tasks", createTask);
router.get("/project/:project", getTasks);  
router.put("/:id", updateTask);

export default router;

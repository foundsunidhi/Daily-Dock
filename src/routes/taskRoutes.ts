import express from "express";
import { createTask, getTasksByProject, updateTask } from "../controller/taskController";

const router = express.Router();

// Define routes
router.post("/", createTask);                // Create a task
router.post("/by-project", getTasksByProject); // Fetch tasks by project
router.put("/:id", updateTask);             // Update a task

// Export the router
export default router;

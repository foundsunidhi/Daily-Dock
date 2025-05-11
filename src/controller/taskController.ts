import { Request, Response } from "express";
import Task from "../models/Task";


export const createTask = async (req: Request, res: Response) => {
  try {
    const { projectId, title, description, startDate, dueDate, userId } = req.body;
    const task = await Task.create({ projectId, title, description, startDate, dueDate, userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
};

// Fetch tasks by projectId
export const getTasksByProject = async (req: Request, res: Response) => {
  const { projectId } = req.body; // Get projectId from the request body

  try {
    const tasks = await Task.find({ projectId })  // Find tasks by projectId
      .populate("userId", "name email empCode")  // Populate user details (name, email, empCode)
      .populate("projectId", "name description");  // Populate project details (name, description)

    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found for this project" });
    }

    res.status(200).json(tasks); // Return populated tasks
  } catch (error) {
    res.status(400).json({ message: "Error fetching tasks", error });
  }
};


export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error });
  }
};

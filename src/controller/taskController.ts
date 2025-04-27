import { Request, Response } from "express";
import Task from "../models/Task";

// Create a Task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, startDate, dueDate, userId } = req.body;
    const task = await Task.create({ title, description, startDate, dueDate, userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
};

// Get all Tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().populate("userId", "name");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: "Error fetching tasks", error });
  }
};

// Update a Task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error });
  }
};


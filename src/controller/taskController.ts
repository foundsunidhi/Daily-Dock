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

export const getTasksByProject = async (req: Request, res: Response) => {
  const { projectId } = req.body;

  try {
    const tasks = await Task.find({ projectId }).populate("userId", "name");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: "Error fetching daily updates", error });
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

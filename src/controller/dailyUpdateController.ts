import { Request, Response } from "express";
import DailyUpdate from "../models/DailyUpdate";

export const createDailyUpdate = async (req: Request, res: Response) => {
  try {
    const { projectId, description, date, userId } = req.body;
    const dailyUpdate = await DailyUpdate.create({ projectId, description, date, userId });
    res.status(201).json(dailyUpdate);
  } catch (error) {
    res.status(400).json({ message: "Error creating daily update", error });
  }
};

export const getDailyUpdatesByProject = async (req: Request, res: Response) => {
  const { projectId } = req.body;

  try {
    const updates = await DailyUpdate.find({ projectId })
      .populate("userId", "name email empCode")
      .populate("projectId", "name description");

    res.status(200).json(updates);
  } catch (error) {
    res.status(400).json({ message: "Error fetching daily updates", error });
  }
};




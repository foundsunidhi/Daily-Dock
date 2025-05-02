import { Request, Response } from "express";
import DailyUpdate from "../models/DailyUpdate";

export const createDailyUpdate = async (req: Request, res: Response) => {
  try {
    const { project, description, date, userId } = req.body;
    const dailyUpdate = await DailyUpdate.create({ project, description, date, userId });
    res.status(201).json(dailyUpdate);
  } catch (error) {
    res.status(400).json({ message: "Error creating daily update", error });
  }
};

export const getDailyUpdatesByProject = async (req: Request, res: Response) => {
  const { project } = req.params;
  try {
    const dailyUpdates = await DailyUpdate.find({ project }).populate("userId", "name");
    res.status(200).json(dailyUpdates);
  } catch (error) {
    res.status(400).json({ message: "Error fetching daily updates", error });
  }
};


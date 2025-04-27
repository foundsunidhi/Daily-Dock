import { Request, Response } from "express";
import DailyUpdate from "../models/DailyUpdate";

// Create a Daily Update
export const createDailyUpdate = async (req: Request, res: Response) => {
  try {
    const { description, date, userId } = req.body;
    const dailyUpdate = await DailyUpdate.create({ description, date, userId });
    res.status(201).json(dailyUpdate);
  } catch (error) {
    res.status(400).json({ message: "Error creating daily update", error });
  }
};

// Get all Daily Updates
export const getDailyUpdates = async (req: Request, res: Response) => {
  try {
    const dailyUpdates = await DailyUpdate.find().populate("userId", "name");
    res.status(200).json(dailyUpdates);
  } catch (error) {
    res.status(400).json({ message: "Error fetching daily updates", error });
  }
};


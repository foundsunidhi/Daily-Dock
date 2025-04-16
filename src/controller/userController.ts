import { AuthRequest } from "../middleware/authMiddleware";
import { Response, NextFunction } from "express";
import User from "../models/User";

export const homePage = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({ message: "Welcome to the Home Page!" });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { _id, name, email, empCode, role } = user;
    res.status(200).json({ id: _id, name, email, empCode, role });
  } catch (error) {
    next(error);
  }
};

export const updateEmpCode = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    const { currentEmpCode, newEmpCode } = req.body;

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (user.empCode !== currentEmpCode) {
      res.status(403).json({ message: "Current empCode does not match" });
      return;
    }

    if (!/^viskk\d{4}$/.test(newEmpCode)) {
      res.status(400).json({ message: "New empCode must be in format viskkXXXX" });
      return;
    }

    const exists = await User.findOne({ empCode: newEmpCode });
    if (exists) {
      res.status(400).json({ message: "New empCode already taken" });
      return;
    }

    user.empCode = newEmpCode;
    await user.save();

    res.status(200).json({
      message: "empCode updated successfully",
      empCode: user.empCode,
    });
  } catch (error) {
    next(error);
  }
};
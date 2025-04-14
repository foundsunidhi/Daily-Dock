import { AuthRequest } from "../middleware/authMiddleware";
import { Response, NextFunction } from "express";

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

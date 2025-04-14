import express, { Request, Response } from "express";
import { register, login } from "../controller/authController";

const router = express.Router();

// POST route for registration
router.post("/register", async (req: Request, res: Response) => {
  try {
    await register(req, res);  // Calling the register function
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// POST route for login
router.post("/login", async (req: Request, res: Response) => {
  try {
    await login(req, res);  // Calling the login function
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;

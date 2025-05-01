import express, { Request, Response } from "express";
import { register, login, updateEmpCode, changePassword, getUserProfile } from "../controller/authController";

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


router.post("/change-password/:empCode", async (req: Request, res: Response) => {
  try {
    await changePassword(req, res);  // Calling the changePassword function
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}); 


router.put("/update-empcode/:id", async (req: Request, res: Response) => {
  try {
    await updateEmpCode(req, res);  // Calling the updateEmpCode function
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});


router.get("/profile/:empCode", async (req: Request, res: Response) => {
  try {
    await getUserProfile(req, res);  // Calling the getUserProfile function
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});  

export default router;

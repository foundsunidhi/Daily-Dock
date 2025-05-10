import express, { Request, Response } from "express";
import { register, login, updateEmpCode, changePassword, getUserProfile } from "../controller/authController";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    await register(req, res);  
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    await login(req, res);  
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.post("/change-password/:empCode", async (req: Request, res: Response) => {
  try {
    await changePassword(req, res);  
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}); 

router.put("/update-empcode/:id", async (req: Request, res: Response) => {
  try {
    await updateEmpCode(req, res);  
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/profile/:empCode", async (req: Request, res: Response) => {
  try {
    await getUserProfile(req, res);  
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});  

export default router;

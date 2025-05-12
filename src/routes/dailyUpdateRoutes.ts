import express from "express";
import {
  createDailyUpdate,
  getDailyUpdatesByProject,
} from "../controller/dailyUpdateController";

const router = express.Router(); 

router.post("/", createDailyUpdate); 
router.post("/by-project", getDailyUpdatesByProject); 

export default router;

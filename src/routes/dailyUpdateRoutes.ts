import express from "express";
import { createDailyUpdate, getDailyUpdatesByProject } from "../controller/dailyUpdateController";

const router = express.Router();

router.post("/dailyupdate", createDailyUpdate); 
router.get("/project/:project", getDailyUpdatesByProject);

export default router;

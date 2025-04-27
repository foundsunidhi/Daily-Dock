import express from "express";
import { createDailyUpdate, getDailyUpdates } from "../controller/dailyUpdateController";

const router = express.Router();

router.post("/daily-updates", createDailyUpdate);
router.get("/daily-updates", getDailyUpdates);

export default router;

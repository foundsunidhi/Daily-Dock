import express from "express";
import { createDailyUpdate, getDailyUpdates, updateDailyUpdate, deleteDailyUpdate } from "../controller/dailyUpdateController";

const router = express.Router();

router.post("/daily-updates", createDailyUpdate);
router.get("/daily-updates", getDailyUpdates);
router.put("/daily-updates/:id", updateDailyUpdate);
router.delete("/daily-updates/:id", deleteDailyUpdate);

export default router;

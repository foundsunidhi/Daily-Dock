import express from "express";
import { createDailyUpdate, getDailyUpdates } from "../controller/dailyUpdateController";

const router = express.Router();

router.post("/dailyupdates", createDailyUpdate);
router.get("/getdailyupdates", getDailyUpdates);

export default router;

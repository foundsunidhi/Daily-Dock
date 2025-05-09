import express from "express";
import {
  createDailyUpdate,
  getDailyUpdatesByProject,
} from "../controller/dailyUpdateController";

const router = express.Router();

router.post("/", createDailyUpdate); // create new update
router.post("/by-project", getDailyUpdatesByProject); // fetch updates by projectId in body

export default router;

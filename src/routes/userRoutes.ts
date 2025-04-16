import express, { RequestHandler } from "express";
import { homePage, getProfile } from "../controller/userController";
import { protect } from "../middleware/authMiddleware";
import { updateEmpCode } from "../controller/userController";

const router = express.Router();

router.get("/home", protect as RequestHandler, homePage as RequestHandler);
router.get("/profile", protect as RequestHandler, getProfile as RequestHandler);
router.put("/update-empcode", protect as RequestHandler, updateEmpCode as RequestHandler);

export default router;

import express, { RequestHandler } from "express";
import { homePage, getProfile } from "../controller/userController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/home", protect as RequestHandler, homePage as RequestHandler);
router.get("/profile", protect as RequestHandler, getProfile as RequestHandler);

export default router;

import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import dailyUpdateRoutes from "./routes/dailyUpdateRoutes";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/daily-updates", dailyUpdateRoutes);  // Check this one especially

// Connect to DB
mongoose.connect(process.env.MONGODB_URL || "")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error", err));

export default app;

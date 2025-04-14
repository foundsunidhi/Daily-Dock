import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes"; 
import userRoutes from "./routes/userRoutes"; 

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  

// Routes
app.use("/api/auth", authRoutes);  
app.use("/api/user", userRoutes);  
// MongoDB connection
mongoose.connect(process.env.MONGODB_URL || "")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error", err));

export default app;

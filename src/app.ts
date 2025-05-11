import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import dailyUpdateRoutes from './routes/dailyUpdateRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/daily-updates', dailyUpdateRoutes);

// Connect to DB
mongoose.connect(process.env.MONGODB_URL || '')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error', err));

export default app;


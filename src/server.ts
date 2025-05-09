import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

dotenv.config();

connectDB();

mongoose.connect(process.env.MONGODB_URL || 'your_mongo_connection_string', {
}).then(() => {
  console.log('MongoDB Connected ✅');
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Chill the server is running :)');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

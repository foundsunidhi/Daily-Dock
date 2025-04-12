import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');      
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} `);
});

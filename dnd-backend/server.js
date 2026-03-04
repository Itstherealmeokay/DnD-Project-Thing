import express from 'express';
import dotenv from 'dotenv';
import characterRoutes from './routes/character.routes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/characters", characterRoutes);

app.listen(5000, () => {
    connectDB();
  console.log('Server is running on port 5000');
});
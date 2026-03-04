import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import characterRoutes from './routes/character.routes.js';
import { connectDB } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use("/api/characters", characterRoutes);

app.listen(5000, () => {
    connectDB();
  console.log('Server is running on port 5000');
});
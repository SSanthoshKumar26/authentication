import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './Routes/AuthRoutes.js';
import userRouter from './Routes/userRoutes.js';
import { getUserData } from './controllers/userController.js'; 
import userAuth from './middleware/userAuth.js';

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS setup using deployed frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));

// Connect to DB
connectDB();

// Test route
app.get('/', (req, res) => res.send('API Working Fine'));

// Protected user data route
app.get('/api/auth/user', userAuth, getUserData);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Start server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});

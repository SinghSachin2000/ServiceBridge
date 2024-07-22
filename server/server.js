import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { morgan } from 'morgan';
import userRouter from './router/userRouter.js';
import workerRouter from './router/workerRouter.js';
import adminRouter from './router/adminRouter.js';
import ratingRouter from './router/ratingRoutes.js';
import { connect } from './config/connection.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 8001;
//route spltiting

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/worker", workerRouter);
app.use("/api/v1/rating", ratingRouter);
database.connect();

// Middleware setup
app.use(express.json());
app.use(morgan());



connect();


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

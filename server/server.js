import express from 'express';
import dotenv from 'dotenv';
import userRouter from './router/userRouter.js';
import workerRouter from './router/workerRouter.js';
import adminRouter from './router/adminRoutes.js';
import { connect as databaseConnect } from './config/connection.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

// Middleware setup
app.use(express.json());

// Route splitting
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/worker', workerRouter);

databaseConnect();

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

<<<<<<< HEAD
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const userRouter = require('./router/userRouter');
const workerRouter = require('./router/workerRouter');
const adminRouter = require('./router/adminRouter');
const database = require("./config/connection");
const ratingRouter = require('./router/ratingRoutes');
const morgon = require("morgan");
=======
import express from 'express';
import dotenv from 'dotenv';
import userRouter from './router/userRouter.js';
import workerRouter from './router/workerRouter.js';
import adminRouter from './router/adminRoutes.js';
import { connect as databaseConnect } from './config/connection.js';

>>>>>>> f2ca9839486170cf5ba4586449c18d76d6b8392b
dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

<<<<<<< HEAD

app.use(morgon());

//route spltiting

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/worker", workerRouter);
app.use("/api/v1/rating", ratingRouter);
database.connect();
=======
// Middleware setup
app.use(express.json());

// Route splitting
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/worker', workerRouter);

databaseConnect();
>>>>>>> f2ca9839486170cf5ba4586449c18d76d6b8392b

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

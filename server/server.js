const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const userRouter = require('./router/userRouter');
const workerRouter = require('./router/workerRouter');
const adminRouter = require('./router/adminRouter');
const database = require("./config/connection")
dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

//route spltiting

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/worker", workerRouter);

database.connect();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

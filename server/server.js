const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const userRouter = require('./router/userRouter');
const workerRouter = require('./router/workerRouter');
const adminRouter = require('./router/adminRouter');
const database = require("./config/connection");
const ratingRouter = require('./router/ratingRoutes');
const morgon = require("morgan");
dotenv.config();

const app = express();
const port = process.env.PORT || 8001;


app.use(morgon());

//route spltiting

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/worker", workerRouter);
app.use("/api/v1/rating", ratingRouter);
database.connect();

//global catch
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})



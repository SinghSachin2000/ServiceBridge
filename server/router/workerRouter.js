const express = require("express");
const { register, login } = require("../controllers/workerController");

const workerRouter = express.Router();


workerRouter.post('/register-worker', register);
workerRouter.post('/login-worker', login);

export default workerRouter;

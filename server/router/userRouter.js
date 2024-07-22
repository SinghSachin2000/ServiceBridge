const express = require("express");
const { login, register } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post('/login-user', login);
userRouter.post('/register-user', register);


module.exports = userRouter;

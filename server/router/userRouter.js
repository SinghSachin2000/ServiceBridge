<<<<<<< HEAD
const express = require("express");
const { login, register } = require("../controllers/userController");
=======
import express from "express";
import {login,register} from '../controllers/userController.js'

>>>>>>> f2ca9839486170cf5ba4586449c18d76d6b8392b
const userRouter = express.Router();

userRouter.post('/login-user', login);
userRouter.post('/register-user', register);


module.exports = userRouter;

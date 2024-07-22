<<<<<<< HEAD
const express = require("express");
const { register, login } = require("../controllers/workerController");
=======
import express from 'express';
import { register, login } from '../controllers/workerController.js';
>>>>>>> f2ca9839486170cf5ba4586449c18d76d6b8392b

const workerRouter = express.Router();

workerRouter.post('/register-worker', register);
workerRouter.post('/login-worker', login);

export default workerRouter;

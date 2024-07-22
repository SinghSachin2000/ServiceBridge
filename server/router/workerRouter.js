import express from 'express';
import { register, login } from '../controllers/workerController.js';

const workerRouter = express.Router();

workerRouter.post('/register-worker', register);
workerRouter.post('/login-worker', login);

export default workerRouter;

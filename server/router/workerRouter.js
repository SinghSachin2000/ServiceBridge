import express from 'express';
import { register, login } from '../controllers/workerController.js';
import jobRouter from './jobRouter.js';


const workerRouter = express.Router();

workerRouter.use('/jobs', jobRouter);
workerRouter.post('/register-worker', register);
workerRouter.post('/login-worker', login);

export default workerRouter;

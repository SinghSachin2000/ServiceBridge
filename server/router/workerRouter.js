import express from 'express';
import { register, login, logout, updateAddress } from '../controllers/workerController.js';
import jobRouter from './jobRouter.js';
import { isWorkerAuth } from '../middleWare/isAuthWorker.js';


const workerRouter = express.Router();

workerRouter.use('/jobs', jobRouter);
workerRouter.post('/register-worker', register);
workerRouter.post('/login-worker', login);
workerRouter.post('/logout-worker', logout);
workerRouter.put('/update-address', isWorkerAuth, updateAddress);


export default workerRouter;

import express from "express";
import { createJob } from "../controllers/jobController.js";
import { isWorkerAuth } from "../middleWare/isAuthWorker.js";

const jobRouter = express.Router();



jobRouter.post('/create-job',isWorkerAuth, createJob);
export default jobRouter;

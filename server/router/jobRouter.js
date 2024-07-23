import express from "express";
import { createJob } from "../controllers/jobController.js";

const jobRouter = express.Router();



jobRouter.post('/create-job', createJob);
export default jobRouter;

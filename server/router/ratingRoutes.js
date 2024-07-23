import express from "express";
import { createRating } from "../controllers/ratingController.js";


const ratingRouter = express.Router();


ratingRouter.post('/post-rating', createRating);

export default ratingRouter;

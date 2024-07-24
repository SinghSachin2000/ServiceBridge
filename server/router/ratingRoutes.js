import express from "express";
import { createRating } from "../controllers/ratingController.js";
import { isUserAuth } from "../middleWare/isAuthUser.js";


const ratingRouter = express.Router();


ratingRouter.post('/post-rating',isUserAuth, createRating);


export default ratingRouter;

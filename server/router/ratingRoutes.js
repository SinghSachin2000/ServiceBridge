import express from "express";
import { createRating,getAverageRating } from "../controllers/ratingController.js";
import { isUserAuth } from "../middleWare/isAuthUser.js";
import { createReview,getAllReview } from "../controllers/reviewController.js";

const ratingRouter = express.Router();


ratingRouter.post('/post-rating',isUserAuth, createRating);
ratingRouter.get('/getAverageRating', getAverageRating);



ratingRouter.post('/post-review',isUserAuth, createReview);
ratingRouter.get('/getAllReview', getAllReview);
export default ratingRouter;

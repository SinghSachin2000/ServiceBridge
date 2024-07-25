import express from "express";
import { createRating,getAverageRating ,getAllRating} from "../controllers/ratingController.js";
import { isUserAuth } from "../middleWare/isAuthUser.js";
import { createReview,getAllReview } from "../controllers/reviewController.js";

const ratingRouter = express.Router();


ratingRouter.post('/post-rating/:workerId',isUserAuth, createRating);
ratingRouter.get('/getAverageRating/:workerId', getAverageRating);
ratingRouter.get('/getAllRating/:workerId', getAllRating);


ratingRouter.post('/post-review/:workerId',isUserAuth, createReview);
ratingRouter.get('/getAllReview/:workerId', getAllReview);
export default ratingRouter;

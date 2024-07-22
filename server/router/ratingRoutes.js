const express = require("express");
const ratingRouter = express.Router();

ratingRouter.post('/post-rating', createRating);

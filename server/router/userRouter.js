import express from "express";
import { login, register, updateAddress } from '../controllers/userController.js'
import { isUserAuth } from "../middleWare/isAuthUser.js";
import { getSearch } from "../controllers/searchController.js";
import jobRouter from "./jobRouter.js";


const userRouter = express.Router();

userRouter.use('/jobs', jobRouter);
userRouter.post('/login-user', login);
userRouter.post('/register-user', register);
userRouter.put('/update-address', isUserAuth, updateAddress);

export default userRouter;

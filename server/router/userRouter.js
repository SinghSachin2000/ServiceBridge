import express from "express";
import { login, register, updateAddress } from '../controllers/userController.js'
import { isUserAuth } from "../middleWare/isAuthUser.js";


const userRouter = express.Router();

userRouter.post('/login-user', login);
userRouter.post('/register-user', register);
userRouter.put('/update-address', isUserAuth, updateAddress);

export default userRouter;

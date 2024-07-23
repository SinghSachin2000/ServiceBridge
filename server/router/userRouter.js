import express from "express";
import { login, register } from '../controllers/userController.js'


const userRouter = express.Router();

userRouter.post('/login-user', login);
userRouter.post('/register-user', register);


export default userRouter;

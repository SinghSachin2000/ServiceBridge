import express from "express";
import { login, register } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post('/login-user', login);
userRouter.post('/register-user', register);


export default userRouter;

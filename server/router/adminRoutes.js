<<<<<<< HEAD
const { express } = require("express");
const { register, login, getProfile, createCategory, deleteCategory, getCategory } = require("../controllers/adminController");
const { isAdminAuth } = require("../middleWare/isAuthAdmin");
=======
import  express  from "express";
import { register, login, getProfile, createCategory } from "../controllers/adminController.js";
>>>>>>> f2ca9839486170cf5ba4586449c18d76d6b8392b
const adminRouter = express.Router();

adminRouter.post('/register-admin', register);
adminRouter.post('/login-admin', login);
adminRouter.get('/get-admin', getProfile);
adminRouter.post('/create-category', isAdminAuth, createCategory);
adminRouter.delete('/delete-category/:id', isAdminAuth, deleteCategory);
adminRouter.get('/get-category/:page/:limit', isAdminAuth, getCategory);

export default adminRouter;

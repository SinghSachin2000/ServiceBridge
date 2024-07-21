import { express } from "express";
import { register, login, getProfile, createCategory } from "../controllers/adminController";
const adminRouter = express.Router();



adminRouter.post('/register-admin', register);
adminRouter.post('/login-admin', login);
adminRouter.get('/get-admin', getProfile);
adminRouter.post('/create-category', createCategory);

export default adminRouter;

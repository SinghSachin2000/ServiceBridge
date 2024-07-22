const { express } = require("express");
const { register, login, getProfile, createCategory, deleteCategory, getCategory } = require("../controllers/adminController");
const { isAdminAuth } = require("../middleWare/isAuthAdmin");
const adminRouter = express.Router();

adminRouter.post('/register-admin', register);
adminRouter.post('/login-admin', login);
adminRouter.get('/get-admin', getProfile);
adminRouter.post('/create-category', isAdminAuth, createCategory);
adminRouter.delete('/delete-category/:id', isAdminAuth, deleteCategory);
adminRouter.get('/get-category/:page/:limit', isAdminAuth, getCategory);

export default adminRouter;

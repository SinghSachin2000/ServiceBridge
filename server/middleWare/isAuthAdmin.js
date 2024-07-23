import Admin from "../Modal/adminModal.js";
import jwt from "jsonwebtoken";
const { COOKIE_NAME, JWT_SECRET } = process.env;

export const isAdminAuth = async (req, res, next) => {
  const { COOKIE_NAME } = req.cookies;
  if (!COOKIE_NAME) {
    return res.status(401).json({
      success: false,
      messge: "Unauthorized Admin"
    });
  }
  try {
    const decoded = jwt.decode(COOKIE_NAME, JWT_SECRET);
    req.admin = await Admin.findById(decoded._id);
    next();
  } catch (e) {
    return res.json(401).json({
      success: false,
      message: "Unauthorized invalid admin"
    })
  }
}

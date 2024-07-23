import User from "../Modal/UserModal.js";
import jwt from "jsonwebtoken";
const { COOKIE_NAME, JWT_SECRET } = process.env;

export const isUserAuth = async (req, res, next) => {
  const { COOKIE_NAME } = req.cookies;
  if (!COOKIE_NAME) {
    return res.status(401).json({
      success: false,
      messge: "Unauthorized User"
    });
  }
  try {
    const decoded = jwt.decode(COOKIE_NAME, JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (e) {
    return res.json(401).json({
      success: false,
      message: "Unauthorized invalid admin"
    })
  }
}

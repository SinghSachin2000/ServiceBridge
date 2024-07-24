import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

const { JWT_SECRET, COOKIE_NAME } = process.env;

export const createCookie = (res, adminId, admin) => {
  try {
    const token = jwt.sign({ _id: adminId }, JWT_SECRET);
    res.status(201);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000
    });
    return res.json({
      success: true,
      message: 'Admin created Added',
      admin
    });
  } catch (error) {
    return res.status(400).json({
      error,
      message: 'Error while creating cookie'
    });
  }
};
export const createCookieUser = (res, userId, user) => {
  try {
    const token = jwt.sign({ _id: userId }, JWT_SECRET);
    res.status(201);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000
    });
    return res.json({
      success: true,
      message: 'User added successfully',
      user

    });
  } catch (error) {
    return res.status(400).json({
      error,
      message: 'Error while creating cookie'
    });
  }
};

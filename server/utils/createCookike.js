const jwt = require("jsonwebtoken");
require("dotenv").config();
dotenv.config();

const { JWT_SECRET, COOKIE_NAME } = process.env;

export const createCookie = (res, adminId) => {
  try {
    const token = jwt.sign({ _id: adminId }, JWT_SECRET);
    res.status(201);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000
    });
    return res.json({ message: 'Cookie created successfully' });
  } catch (error) {
    return res.status(400).json({
      error,
      message: 'Error while creating cookie'
    });
  }
};

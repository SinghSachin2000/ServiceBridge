import Admin from "../Modal/adminModal";
import Category from "../Modal/CategoryModal";
import bcrypt from "bcrypt";
import { createCookie } from "../utils/createCookike";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({
      email
    });
    if (existingAdmin) {
      res.status(401);
      return res.json({
        message: "Admin already exists for this email",
        success: false
      })
    }
    const hash = await bcrypt.hash(password, 10);
    let admin = await Admin.create({
      name,
      email,
      password: hash
    });
    createCookie(admin._id);
    return res.json({
      sucess: "true",
      admin
    })
  } catch (e) {
    next(e);
  }

}
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let admin = await Admin.findOne({
      email: email
    }).select("+password");
    if (!admin) {
      res.status(404);
      return res.json({
        message: "Wrong credentials for admin",
        success: false
      })
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(404);
      return res.json({
        message: "Wrong credentials for admin",
        success: false
      })
    }
    createCookie(admin._id);
    return res.json({
      sucess: "true",
      admin
    })

  } catch (e) {
    next(e);
  }
}
export const logout = async (req, res) => {
  res.clearCookie("cookieName", {
    seucre: false,
    sameSite: "strict",
    path: "/admin"
  })
  res.status(200);
  return res.json({
    sucess: true,
    message: "Logout Sucessful"
  })
}
export const getProfile = async (req, res) => {
  res.status(200);
  return res.json({
    success: true,
    admin: res.admin
  })
}

export const createCategory = async (req, res) => {

}

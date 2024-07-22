const Admin = require("../Modal/adminModal");
const Category = require("../Modal/CategoryModal");
const bcrypt = require("bcrypt");
const { createCookie } = require("../utils/createCookike");

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
export const getCategory = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const getAllCategory = await Category.find().skip((page - 1) * limit).limit(limit);
    const total = await Category.countDocuments();
    return res.status(200).json({
      data: getAllCategory,
      currentPage: page,
      total
    });
  } catch (error) {
    next(error);
  }
}
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.param;
    const findCategory = await Category.findById(id);
    if (!findCategory) {
      return res.status(400).json({
        message: "Category not found",
        success: false
      });
    }
    const deleteCategory = await Category.findByIdAndDelete(id);
    if (!deleteCategory) {
      return res.status(400).json({
        message: "Error in category deleted successfully",
        success: false
      })
    }
    return res.status(200).json({
      message: "Category deleted successfully",
      success: true
    })
  } catch (error) {
    next(error);
  }
}

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Name not found",
        success: false
      })
    }
    const category = await Category.create({
      name
    });
    if (!category) {
      return res.status(400).json({
        message: "Error in category creation",
        success: false
      })
    }
    return res.status(201).json({
      category,
      success: true
    })
  } catch (e) {
    next(e);
  }
}

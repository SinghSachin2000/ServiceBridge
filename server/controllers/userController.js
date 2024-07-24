import Address from "../Modal/AddressModal.js";
import User from "../Modal/UserModal.js";
const { COOKIE_NAME, JWT_SECRET } = process.env;
import { createCookieUser } from "../utils/createCookike.js";
import bcrypt from "bcrypt"

export const register = async (req, res) => {
  try {
    const { name, email, password, profileImage, phoneno } = req.body;
    console.log(req.body);
    if (!name || !email || !password || !phoneno) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10)


    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImage,
      phoneno,
      active: true,
    });
    createCookieUser(res, newUser._id, newUser);
    console.log("newuser", newUser)


  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "user cannot be registered. please try again.",
    })
  }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        messsage: 'Please fill up all the required fields',
      })
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered with us please signup to continue",
      })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(404);
      return res.json({
        message: "Wrong credentials for admin",
        success: false,
      })
    }
    createCookieUser(res, user._id, user);
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Login failure please try again",
    })
  }
}

export const updateAddress = async (req, res, next) => {
  try {
    const { lat, lng } = req.body;
    const { _id } = req.user;

    const userAddress = User.findById(_id);
    if (!userAddress) {
      return res.status(400).json({
        message: "User Address not found",
        success: false
      })
    }
    const location = {
      type: "Point",
      coordinates: [lat, lng]
    }
    const updateAddress = await User.findOneAndUpdate(
      { _id },
      { $set: { location } },
      { new: true }
    );
    if (!updateAddress) {
      return res.status(400).json({
        success: false,
        message: 'Error in updating the address'
      });
    }
    return res.status(200).json({
      success: true,
      user: updateAddress,
      message: 'Address updated successfully!'
    });
  } catch (error) {
    next(error);
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/'
    });
    return res.status(200).json({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "logout failure, please try again "
    })
  }
}
export const getProfile = async (req, res) => {

}

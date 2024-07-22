const Address = require("../Modal/AddressModal");
const User = require("../Modal/UserModal");
const { COOKIE_NAME, JWT_SECRET } = process.env;

export const register = async (req, res) => {
  try {
    const { name, email, password, phoneno } = req.body
    if (!name || !email || !password || !phoneno) {
      return res.status(403).send({
        success: false,
        message: "All fields are required",
      })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue."
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const addressDetails = await Address.create({
      location: {
        type: null,
        coordinates: null
      },
      type: null,
      pincode: null,
      street: null,
      country: null,
      city: null
    })
    let user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneno,
      authToken: '',
      address: addressDetails._id
    })
    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    })
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
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered with us please signup to continue",
      })
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        JWT_SECRET,
        {
          expiresIn: "24h"
        }
      )

      user.authToken = token
      user.password = undefined
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie(COOKIE_NAME, token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Login failure please try again",
    })
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
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "logout failure, please try again "
    })
  }
}
export const getProfile = async (req, res) => {

}

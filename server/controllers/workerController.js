import workerModel from '../Modal/workerModel.js';
import Address from '../Modal/AddressModal.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { name, password, phone } = req.body;

  try {
    if (!name || !password || !phone) {
      return res.status(403).json({
        success: false,
        message: 'All fields are required',
      });
    }

    let existingUser = await workerModel.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Worker already exists, please try with another number or login instead',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const addressDetails = await Address.create({
      type: null,
      pincode: 121002,
      street: "address",
      country: "India",
      city: "fbd"
    })

    let newUser = await workerModel.create({
      name,
      password: hashedPassword,
      phone,
      authToken: '',
      address: addressDetails._id
    });

    res.status(200).json({
      message: 'Worker joined successfully',
      newUser,
    });
  } catch (error) {
    console.error('Error during registration:', error); // Log the error details
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const login = async (req, res) => {
  // Login logic
};

export const logout = async (req, res) => {
  // Logout logic
};

export const getProfile = async (req, res) => {
  // Get profile logic
};

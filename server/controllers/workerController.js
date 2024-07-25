import workerModel from '../Modal/workerModel.js';
import bcrypt from 'bcrypt';
import { createCookieWorker } from '../utils/createCookike.js';


export const register = async (req, res) => {
  const { name, password, phone } = req.body;
  console.log(req.body);

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


    let newUser = await workerModel.create({
      name,
      password: hashedPassword,
      phone,
    });

    createCookieWorker(res,newUser._id,newUser);

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "user cannot be registered. please try again.",
    })
  }
};

/*-----------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------*/

export const login = async (req, res) => {
  const { password, phone } = req.body;

  try {
    if (!password || !phone) {
    res.status(403).json({
      success:false,
      message:"Both the feilds are required"
    })
  }
  let worker =await workerModel.findOne({ phone: phone});

  if (!worker) {
    return res.status(404).json({
      success: false,
      message: "worker does not exist"
    });
  }

  const isMatch = await bcrypt.compare(password,worker.password);
  
  if (!isMatch) {
    return res.status(400), json({
      success: false,
      message:"Ivalid credentials"
    })
  }
    createCookieWorker(res, worker._id, worker);

    
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Login failed, please try again',
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("cookieName", {
    seucre: false,
    sameSite: "strict",
    path: "/worker"
  })
  res.status(200);
  return res.json({
    sucess: true,
    message: "Logout Sucessful"
  })
};

export const getProfile = async (req, res) => {
  // Get profile logic
};

export const updateAddress = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    const workerId = req.worker._id
    
    const workerAdress = await workerModel.findById(workerId);

    if (!workerAdress) {
      res.status(404).json({
        success: false,
        message:"worker address not found"
      })
    }

    const location = {
      type: "Point",
      coordinates: [lng, lat],
    }

    //update address
    const updatedWorker = await workerModel.findByIdAndUpdate(
      workerId,
      { $set: { location } },
      {new:true}
    );

    if (!updatedWorker) {
      return res.status(400).json({
        success: false,
        message:"Error in updating the address"
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Address updated successfully!',
      updatedWorker,
    })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
}


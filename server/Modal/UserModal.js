import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    }
  },
  profileImage: {
    URL: String
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  authToken: {
    type: String,
    required: true
  },
  active: {
    type: Boolean
  },
  phoneno: {
    countryCode: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now().toLocaleString()
  },
  updatedAt: {
    type: Date,
    default: Date.now().toLocaleString()
  }
})
export const User = mongoose.model('User', userSchema);
export default User;


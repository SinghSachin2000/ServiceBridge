import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: string,
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
    type: string,
    required: true
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  email: {
    type: string,
    required: true
  },
  password: {
    type: string,
    required: true
  },
  authToken: {
    type: string,
    required: true
  },
  active: {
    type: boolean
  },
  phoneno: {
    countryCode: {
      type: string,
      required: true
    },
    number: {
      type: string,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
})
export const User = mongoose.model('User', userSchema);
export default User;


import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  currpassword: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  profileImg: {
    URL: String,
  },
  rating: {
    type: mongoose.Types.ObjectId,
    ref: 'Rating',
  },
  address: {
    type: mongoose.Types.ObjectId,
    ref: 'Address',
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
  active: {
    type: Boolean,
    default: true,
  },
  authToken: {
    type: String,
  },
  workingHours: {
    type: String,
  },
}, { timestamps: true });

export const Worker = mongoose.model('Worker', workerSchema);
export default Worker;

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker"
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
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  price: {
    type: Number,
    required: true
  },
  noOfHours: {
    type: [Number],
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ['Posted', 'Ordered', 'Accepted', 'Completed'],
    default: 'Posted'
  }
})
export const Job = mongoose.model('Job', jobSchema);
export default Job;


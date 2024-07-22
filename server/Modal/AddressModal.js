import { mongoose } from "mongoose";

const addressSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      
    },
    coordinates: {
      type: [Number],
    }
  },
  type: {
    type: ["Home", "Office", "Other"]
  },
  pincode: {
    type: Number,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});
const Address = mongoose.model('Address', addressSchema);
export default Address;

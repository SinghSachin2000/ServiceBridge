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
    type: number,
    required: true
  },
  street: {
    type: string,
    required: true
  },
  country: {
    type: string,
    required: true
  },
  city: {
    type: string,
    required: true
  }
});
const Address = mongoose.model('Address', addressSchema);
export default Address;

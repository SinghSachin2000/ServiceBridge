import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: string,
    required: true
  }
})
export const User = mongoose.model('User', userSchema);
export default User;


import { moongose } from "moongose";

const adminSchema = new moongose.Schmea({
  name: {
    type: string,
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
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export const Admin = moongose.model('Admin', adminSchema);
export default Admin;

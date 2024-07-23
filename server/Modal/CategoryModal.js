import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 100,
  },
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs"
  }]
})
export const Category = mongoose.model('Category', categorySchema);
export default Category;


import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs"
  }]
})
export const Category = mongoose.model('Category', categorySchema);
export default Category;


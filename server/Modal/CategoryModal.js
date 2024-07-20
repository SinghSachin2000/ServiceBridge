import { mongoose } from "mongoose";

const categorySchema = new mongoose.Schema({
categoryName:{
    type:string,
    required:true,
    unique:true,
    maxLength:50,
},
description:{
    type:string,
    maxLength:100,
},
jobs:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Jobs"
}]
})
export const User = mongoose.model('Category', categorySchema);
export default Category;


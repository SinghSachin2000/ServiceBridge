import { mongoose } from "mongoose";

const jobSchema = new mongoose.Schema({
workerId :{
       type:mongoose.Schema.Types.ObjectId,
       ref:"worker"
},
categoryId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Category"
},
price:{
    type:Number,
    required:true
},
noOfHours:{
    type:Number,
    required:true
},
pincode:{
    type:Number,
    required:true
},
createdAt :{
    type:Date,
    default:Date.now()
},
status:{
    type:string,
    enum:['pending','completed','accepted','rejected'],
    default:'pending'
}
})
export const User = mongoose.model('Job', jobSchema);
export default Job;


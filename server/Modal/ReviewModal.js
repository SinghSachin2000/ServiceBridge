const { mongoose } = require("mongoose");


const ReviewModal = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  content: {
    type: String,
    require: true
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    require: true
  }
});

const Review = mongoose.model('Review', ReviewModal);
export default Review;

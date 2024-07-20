const { mongoose } = require("mongoose");


const ReviewModal = new mongoose.createSchema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  content: {
    type: string,
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
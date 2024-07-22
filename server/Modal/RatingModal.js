const { mongoose } = require("mongoose");


const RatingModal = new mongoose.createSchema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  rating: {
    type: string,
    require: true
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    require: true
  }
});

const Rating = mongoose.model('Review', RatingModal);
export default Rating;

import mongoose from 'mongoose';
import Review from "../Modal/ReviewModal.js";
import WorkerModel from "../Modal/workerModel.js"

export const createReview = async (req, res) => {
  try {
    const userId = req.user._id
    const { content, workerId } = req.body

    const workerDetails = await WorkerModel.findOne({
      _id: workerId
    })
    if (!workerDetails) {
      return res.status(404).json({
        success: false,
        message: "worker is not there!!"
      })
    }
    /*
      const alreadyReviewed = await Review.findOne({
        userId: userId,
        workerId: workerId
      })
  
      if (alreadyReviewed) {
        return res.status(403).json({
          success: false,
          message: "worker already reviewed by the user"
        })
      }
  */
    const newreview = await Review.create({
      userId: userId,
      content: content,
      workerId: workerId
    })
    await WorkerModel.findByIdAndUpdate(workerId, {
      $push: {
        reviews: newreview,
      }
    })
    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      newreview,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e.message,
    })
  }
}

export const getAllReview = async (req, res) => {
  try {
    const allReview = await Review.find({})
      .populate({
        path: "User",
        select: "name profileImage email"
      })
      .populate({
        path: "Worker",
        select: "name  email profileImg"
      })
      .exec()
    return res.status(200).json({
      success: true,
      data: allReview,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the reviews for the worker",
      error: e.message,
    })
  }
}

import mongoose from 'mongoose';
import Rating from "../Modal/RatingModal.js";
import WorkerModel from "../Modal/workerModel.js"

export const createRating = async (req, res) => {
  try {
    const userId = req.user.id
    const { rating, workerId } = req.body

    const workerDetails = await WorkerModel.findOne({
      _id: workerId
    })
    if (!workerDetails) {
      return res.status(404).json({
        success: false,
        message: "worker is not there!!"
      })
    }

    const alreadyRatingGiven = await Rating.findOne({
      userId: userId,
      workerId: workerId
    })

    if (alreadyRatingGiven) {
      return res.status(403).json({
        success: false,
        message: "worker already rated by the user"
      })
    }

    const newrating = await Rating.create({
      userId: userId,
      rating: rating,
      workerId: workerId
    })
    await WorkerModel.findByIdAndUpdate(workerId, {
      $push: {
        ratings: newrating,
      }
    })
    return res.status(201).json({
      success: true,
      message: "Rating created successfully",
      newrating,
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

export const getAverageRating = async (req, res) => {
  try {
    const workerId = req.body.workerId
    const result = await Rating.aggregate([
      {
        $match: {
          workerId: new mongoose.types.ObjectId(workerId),

        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$AverageRating" },
        }
      }
    ])
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      })
    }
    return res.status(200).json({
      success: true,
      averageRating: 0,
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the course",
      error: e.message,
    })
  }
}

export const getAllRating = async (req, res) => {
  try {
    const allRating = await Rating.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "User",
        select: "name profileImage email"
      })
      .populate({
        path: "Worker",
        select: "firstName lastName email image"
      })
      .exec()
    res.status(200).json({
      success: true,
      data: allRating,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the worker",
      error: e.message,
    })
  }
}

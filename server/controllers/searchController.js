import Job from "../Modal/JobModal.js";

export const getSearch = async (req, res, next) => {
  try {
    const { location } = req.user;
    const { coordinates } = location;
    const jobs = await Job.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [coordinates] },
          distanceField: "distance",
          maxDistance: 20000,
          minDistance: 10000,
          spherical: true
        }
      },
      {
        $lookup: {
          from: "Worker",
          localField: "workerId",
          foreignField: "_id",
          as: "Worker"
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          noOfHours: 1,
          images: 1,
          price: 1,
          status: 1,
          distance: { $divide: ["$distance", 1000] },
          worker: {
            _id: 1,
            phone: 1,
            name: 1,
            phone: 1,
            profileImg: 1
          }
        }
      }
    ]);
    return res.status(200).json({
      success: true,
      data: jobs
    })
  } catch (error) {
    next(error);
  }
}
//TODO :SEND THE CATEGORY ID AND FIND THE JOB BY CATEGORY 

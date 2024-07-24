import Category from "../Modal/CategoryModal.js";
import Job from "../Modal/JobModal.js";

export const createJob = async (req, res) => {
  try {
    const { categoryId, price, minHour, maxHour } = req.body;
    const category = await Category.findById({
      id: categoryId
    });
    if (!category) {
      return res.status(400).json({
        message: "Category not found",
        success: false
      })
    }
    const worker = res.worker;
    const noOfHours = [minHour, maxHour];
    const createJob = await Job.create({
      workerId: worker._id,
      categoryId: categoryId,
      location: worker.location,
      noOfHours: noOfHours,
      price: price
    });
    if (!createJob) {
      console.log(createJob);
      return res.status(400).json({
        message: "Job creation failed",
        success: false
      })
    }
    return res.status(200).json({
      job: createJob,
      message: "Job creation successful",
      success: false
    });
  } catch (error) {
    next(error);
  }
}

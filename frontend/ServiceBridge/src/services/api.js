const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints ={
REGISTER_API_USER: BASE_URL + "/user/register-user",
REGISTER_API_WORKER : BASE_URL + "/worker/register-worker",
LOGIN_API_USER : BASE_URL + "/user/login-user",
LOGIN_API_WORKER : BASE_URL + "/worker/login-worker",

}

export const addressUpdate = {
   UPDATE_ADDRESS_API_USER: BASE_URL+"/user/update-address",
}
export const jobsCreate = {
    JOB_API_CREATE:BASE_URL+"/worker/jobs",

}

export const ratingAndReview ={
   POST_RATING_API:BASE_URL+ "/rating/post-rating",
   GET_AVERAGE_RATING_API:BASE_URL+ "/rating/getAverageRating",
   POST_REVIEW_API:BASE_URL+ "/rating/post-review",
   GET_ALL_REVIEW_API:BASE_URL+ "/rating/getAllReview",
}

export const adminapis ={
  ADMIN_LOGIN_API :BASE_URL+"/admin/login-admin",
  GET_ADMIN_PROFILE_API :BASE_URL+"/admin/get-admin",
  CREATE_CATEGORY_API:BASE_URL+"/admin/create-category",
  DELETE_CATEGORY_API :BASE_URL+"/admin/delete-category/:id",
  GET_CATEGORY_API:BASE_URL+"/admin/get-category/:page/:limit",
}
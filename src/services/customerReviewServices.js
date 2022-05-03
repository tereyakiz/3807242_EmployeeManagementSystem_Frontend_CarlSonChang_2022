import apiendpoints from "../common/apiendpoints";
import method from "../common/method";
import commonServices from "./commonServices";

export const addCustomerReview = (req, jobId) => {
  return commonServices(apiendpoints.addCustomerReview(jobId), method.POST, req);
};

export const getAccountCustomerReviews = () => {
    return commonServices(apiendpoints.getAccountCustomerReviews(), method.GET);
  };

export const getCustomerReviewsByJobId = (jobId) => {
  return commonServices(apiendpoints.getCustomerReviewsByJobId(jobId), method.GET);
};

export const updateCustomerReviewByJobIdCustomerReviewId = (req, jobId,customerReviewId) => {
  return commonServices(apiendpoints.updateCustomerReviewByJobIdCustomerReviewId(jobId,customerReviewId), method.PUT, req);
};


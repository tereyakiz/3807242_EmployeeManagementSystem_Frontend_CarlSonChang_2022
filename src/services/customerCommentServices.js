import apiendpoints from "../common/apiendpoints";
import method from "../common/method";
import commonServices from "./commonServices";

export const getCustomerComments = (jobId) => {
  return commonServices(apiendpoints.getCustomerComments(jobId), method.GET);
};
export const addCustomerComment = (req, jobId) => {
  return commonServices(apiendpoints.addCustomerComment(jobId), method.POST, req);
};

export const getAccountCustomerComments = () => {
    return commonServices(apiendpoints.getAccountCustomerComments(), method.GET);
  };

export const getCustomerCommentsByJobId = (jobId) => {
  return commonServices(apiendpoints.getCustomerCommentsByJobId(jobId), method.GET);
};

export const updateCustomerCommentByJobIdCustomerCommentId = (req, jobId,customerCommentId) => {
  return commonServices(apiendpoints.updateCustomerCommentByJobIdCustomerCommentId(jobId,customerCommentId), method.PUT, req);
};


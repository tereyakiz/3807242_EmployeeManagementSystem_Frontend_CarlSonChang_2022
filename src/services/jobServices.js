import apiendpoints from "../common/apiendpoints";
import method from "../common/method";
import commonServices from "./commonServices";

export const getJobs = () => {
  return commonServices(apiendpoints.getJobs(), method.GET);
};
export const addJob = (req) => {
  return commonServices(apiendpoints.addJob(), method.POST, req);
};

export const updateJob = (req, jobId) => {
  return commonServices(apiendpoints.updateJob(jobId), method.PUT, req);
};

export const getJobById = (JobId) => {
  return commonServices(apiendpoints.getJobById(JobId), method.GET);
};

export const getJobTypes = () => {
  return commonServices(apiendpoints.getJobTypes(), method.GET);
};
export const deleteJob = (JobId) => {
  return commonServices(apiendpoints.deleteJob(JobId), method.DELETE);
};

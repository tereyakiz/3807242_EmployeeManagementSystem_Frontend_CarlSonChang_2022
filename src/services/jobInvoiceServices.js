import apiendpoints from "../common/apiendpoints";
import method from "../common/method";
import commonServices from "./commonServices";

export const addJobInvoiceItem = (req, jobId) => {
  return commonServices(apiendpoints.addJobInvoiceItem(jobId), method.POST, req);
};

export const getJobInvoiceItems = (jobId) => {
    return commonServices(apiendpoints.getJobInvoiceItems(jobId), method.GET);
};

export const updateJobInvoiceItem = (req, jobId, invoiceItemId) => {
  return commonServices(apiendpoints.updateJobInvoiceItem(jobId, invoiceItemId), method.PUT, req);
};

export const deleteJobInvoiceItem = (req, jobId, invoiceItemId) => {
  return commonServices(apiendpoints.deleteJobInvoiceItem(jobId, invoiceItemId), method.DELETE, req);
};


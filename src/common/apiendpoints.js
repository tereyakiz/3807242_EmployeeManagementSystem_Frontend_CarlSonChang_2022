const endpoints = {
  login: () => "/api/v1/accounts/login",
  getToken: (token) => `/api/v1/token_info/${token}`,

  // users
  getUsers: () => "/api/v1/accounts/users",
  addUser: () => "/api/v1/accounts/users",
  getUserById: (accountUserId) => `/api/v1/accounts/users/${accountUserId}`,
  updateUser: (accountUserId) => `/api/v1/accounts/users/${accountUserId}`,
  deleteUser: (accountUserId) => `/api/v1/accounts/users/${accountUserId}`,
  updatePassword: ()=> "/api/v1/accounts/password/update",
  signUpUser: () => "/api/v1/accounts/signup",

  // job
  getJobs: () => "/api/v1/jobs",
  addJob: () => "/api/v1/jobs",
  getJobById: (jobId) => `/api/v1/jobs/${jobId}`,
  updateJob: (jobId) => `/api/v1/jobs/${jobId}`,
  getJobTypes: () => "/api/v1/jobs/types",

  // customer-review
  getAccountCustomerReviews: () => "/api/v1/customerReviews",
  addCustomerReview: (jobId) => `api/v1/jobs/${jobId}/customerReviews`,
  getCustomerReviewsByJobId: (jobId) => `/api/v1/jobs/${jobId}/customerReviews`,
  updateCustomerReviewByJobIdCustomerReviewId: (jobId, customerReviewId) =>
    `api/v1/jobs/${jobId}/customerReviews/${customerReviewId}`,

  // customer-comment
  getAccountCustomerComments: () => "/api/v1/jobComments",
  addCustomerComment: (jobId) => `api/v1/jobs/${jobId}/jobComments`,
  getCustomerCommentsByJobId: (jobId) => `/api/v1/jobs/${jobId}/jobComments`,
  updateCustomerCommentByJobIdCustomerCommentId: (jobId, customerCommentId) =>
    `api/v1/jobs/${jobId}/jobComments/${customerCommentId}`,

    // job-invoice
  getJobInvoiceItems: (jobId) => `api/v1/jobs/${jobId}/invoiceItems`,
  addJobInvoiceItem: (jobId) => `api/v1/jobs/${jobId}/invoiceItems`,
  updateJobInvoiceItem: (jobId, invoiceItemItem) => `/api/v1/jobs/${jobId}/invoiceItems/${invoiceItemItem}`,
  deleteJobInvoiceItem: (jobId, invoiceItemItem) => `/api/v1/jobs/${jobId}/invoiceItems/${invoiceItemItem}`,
};

export default endpoints;
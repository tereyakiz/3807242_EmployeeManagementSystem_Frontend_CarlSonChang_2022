const JobStatusConstants = {
    ISSUE_RAISED: "ISSUE_RAISED", // Customer
	QUOTE_RAISED: "QUOTE_RAISED", // Admin
	QUOTE_APPROVED: "QUOTE_APPROVED", // Customer
	ASSIGNED: "ASSIGNED", // Admin -> Contractor
	PENDING: "PENDING", // Contractor
	ONHOLD: "ONHOLD",  // Contractor
	STARTED: "STARTED",  // Contractor
	DONE: "DONE", // Contractor
	INVOICE_RAISED: "INVOICE_RAISED", // Contractor
	PAYMENT_DONE: "PAYMENT_DONE" // Customer
}

const UserTypes = {
    ADMIN: "ADMIN",
    CONTRACTOR: "CONTRACTOR",
    CUSTOMER: "CUSTOMER"
}

export {
	JobStatusConstants,
	UserTypes
}
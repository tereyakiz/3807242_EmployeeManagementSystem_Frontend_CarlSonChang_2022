import { JobStatusConstants, UserTypes } from "../../common/constants"

const statusMap = {
    ISSUE_RAISED: {
        allowedActions: [JobStatusConstants.QUOTE_RAISED],
        allowedUsers: [UserTypes.ADMIN]
    },
	QUOTE_RAISED: {
        allowedActions: [JobStatusConstants.QUOTE_APPROVED],
        allowedUsers: [UserTypes.CUSTOMER]
    },
	QUOTE_APPROVED: {
        allowedActions: [JobStatusConstants.ASSIGNED],
        allowedUsers: [UserTypes.ADMIN]
    },
	ASSIGNED: {
        allowedActions: [JobStatusConstants.STARTED],
        allowedUsers: [UserTypes.CONTRACTOR, UserTypes.ADMIN]
    },
    STARTED: {
        allowedActions: [JobStatusConstants.PENDING, JobStatusConstants.ONHOLD, JobStatusConstants.DONE],
        allowedUsers: [UserTypes.ADMIN, UserTypes.CONTRACTOR]
    },
	PENDING: {
        allowedActions: [JobStatusConstants.PENDING, JobStatusConstants.ONHOLD, JobStatusConstants.DONE],
        allowedUsers: [UserTypes.ADMIN, UserTypes.CONTRACTOR]
    },
	ONHOLD: {
        allowedActions: [JobStatusConstants.PENDING, JobStatusConstants.ONHOLD, JobStatusConstants.DONE],
        allowedUsers: [UserTypes.ADMIN, UserTypes.CONTRACTOR]
    },
	DONE: {
        allowedActions: [JobStatusConstants.INVOICE_RAISED],
        allowedUsers: [UserTypes.ADMIN]
    },
	INVOICE_RAISED: {
        allowedActions: [JobStatusConstants.PAYMENT_DONE],
        allowedUsers: [UserTypes.ADMIN, UserTypes.CONTRACTOR]
    },
	PAYMENT_DONE: {
        allowedActions: [],
        allowedUsers: []
    },
}

export function getAllowedStatus (initialStatus) {
    let obj = {
        allowedActions: [JobStatusConstants.ISSUE_RAISED],
        allowedUsers: [UserTypes.CUSTOMER, UserTypes.ADMIN]
    }
    if (statusMap.hasOwnProperty(initialStatus)) {
        obj =  {
            allowedActions: [initialStatus, ...statusMap[initialStatus].allowedActions],
            allowedUsers: statusMap[initialStatus].allowedUsers
        }
    }
    return obj;
}
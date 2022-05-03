import styled from "@emotion/styled";
import React, { useState, useEffect, useReducer, useContext } from "react";
import { AppContext } from '../../store/AppState';
import JobForm from "./JobForm";
import JobReviews from "./JobReviews";
import JobComments from "./JobComments";
import JobInvoice from "./JobInvoice";
import { Table, Space, Popconfirm, Button } from "antd";
import { getJobs } from "../../services/jobServices";
import { PlusOutlined } from "@ant-design/icons";
import ActionDropdown from "../../components/ActionDropdown";

const TableContainer = styled.div`
  display: row;
  @media (max-width: 991px) {
    left: 70%;
  }
`;
const AddJobButton = styled(Button)`
  margin-bottom: 20px;
`
const JobContainer = styled.div`
  padding: 20px;
`;

const initialStateObj = {
  visible: false,
  isEdit: false,
  record: null,
  action: ''
}

function Jobs() {
  const { jobs, setJobs, userInfo } = useContext(AppContext);
  const getAllJobs = async () => {
    const res = await getJobs();
    if (res?.jobs) {
      const jobs = res.jobs.map(job => ({
        ...job,
        jobDeliveryDate: job.jobDeliveryDate ? new Date(job.jobDeliveryDate) : null,
        jobExpectedDeliveryDate: job.jobExpectedDeliveryDate ? new Date(job.jobExpectedDeliveryDate) : null,
        key: job.jobId
      }));
      if (userInfo?.user?.accountUserType == 'CUSTOMER') {
        setJobs(jobs.filter(job => job.createdBy === userInfo.user.accountUserId))
      } else if (userInfo?.user?.accountUserType == 'CONTRACTOR') {
        setJobs(jobs.filter(job => job.issuedTo === userInfo.user.accountUserId))
      } else {
        setJobs(jobs);
      }
    }
  };

  const [stateObj = {}, dispatch] = useReducer(reducer, initialStateObj);

  function reducer (state, action) {
    switch (action.type) {
      case 'editJob':
      case 'reviews':
      case 'comments':
      case 'invoices':
        state = {
          visible: true,
          isEdit: true,
          record: action.record || null,
          action: action.type
        }
        break;
      case 'addJob':
        state = {
          visible: true,
          isEdit: false,
          record: null,
          action: 'addJob'
        }
        break;
      case 'close':
        state = {
          visible: false,
          isEdit: false,
          record: null,
          action: ''
        }
        if (action.isSuccess === true) {
          getAllJobs();
        }
        break;
      default:
        break;
    }
    return state;
  }

  useEffect(() => {
    getAllJobs();
  }, []);

  const columns = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",

      width: 150,
    },
    {
      title: "Job Description",
      dataIndex: "jobDecsription",
      key: "jobDecsription",

      width: 250,
    },
    {
      title: "Delivery Date",
      dataIndex: "jobDeliveryDate",
      key: "jobDeliveryDate",
      render: (text, record) => {
        return record.jobDeliveryDate ? record.jobDeliveryDate.toLocaleDateString() : ''
      },
      width: 200,
    },
    {
      title: "Expected Delivery Date",
      dataIndex: "jobExpectedDeliveryDate",
      key: "jobExpectedDeliveryDate",
      render: (text, record) => {
        return record.jobExpectedDeliveryDate ? record.jobExpectedDeliveryDate.toLocaleDateString() : ''
      },
      width: 200,
    },
    {
      title: "Job Status",
      dataIndex: "jobStatus",
      key: "jobStatus",

      width: 200,
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
      key: "jobType",

      width: 200,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      width: 200,
    },
    {
      title: "Actions",
      key: "operation",
      width: 150,
      render: (text, record) => (
        <ActionDropdown handleClick={(actionType) => dispatch({
          type: actionType,
          record
        })} />
      ),
    },
  ];
  return (
    <>
      <JobContainer>
        {
          userInfo?.user?.accountUserType !== 'CONTRACTOR' && <AddJobButton type="primary" onClick={() => dispatch({type: 'addJob'})}>
            <PlusOutlined /> Add job
          </AddJobButton>
        }
        <TableContainer>
          <Table columns={columns} dataSource={jobs} size="middle" />
        </TableContainer>
      </JobContainer>
        {
          (stateObj.action == 'editJob' || stateObj.action == 'addJob') &&
            <JobForm visible={stateObj.visible} record={stateObj.record} isEdit={stateObj.isEdit} handleClose={(isSuccess) => dispatch({
              type: 'close',
              isSuccess
            })} />
        }
        {
          stateObj.action == 'reviews' &&
            <JobReviews visible={stateObj.visible} record={stateObj.record} handleClose={(isSuccess) => dispatch({
              type: 'close',
              isSuccess
            })} />
        }
        {
          stateObj.action == 'comments' &&
            <JobComments visible={stateObj.visible} record={stateObj.record} handleClose={(isSuccess) => dispatch({
              type: 'close',
              isSuccess
            })} />
        }
        {
          stateObj.action == 'invoices' &&
            <JobInvoice visible={stateObj.visible} record={stateObj.record} isEdit={stateObj.isEdit} handleClose={(isSuccess) => dispatch({
              type: 'close',
              isSuccess
            })} />
        }
    </>
  );
}

export default Jobs;

import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Input,
  Drawer,
  Form,
  Button,
  Select,
  DatePicker,
} from "antd";
import "antd/dist/antd.css";
import { addJob, getJobTypes, updateJob } from "../../services/jobServices";
import { getUsers } from "../../services/userServices";
import { getAllowedStatus } from "./JobUtils";
import { AppContext } from "../../store/AppState";
import Moment from 'moment';

const { Option } = Select;

const JobForm = ({ record = {}, isEdit = false, visible = false, handleClose }) => {
  const { userInfo, users, setUsers, isUserLoggedIn } = useContext(AppContext);
  let isAdmin = false;
	let isCustomer = false;
  let isContractor = false;
	if (isUserLoggedIn && userInfo?.user) {
		isAdmin = userInfo?.user.accountUserType == 'ADMIN';
		isCustomer = userInfo?.user.accountUserType == 'CUSTOMER';
		isContractor = userInfo?.user.accountUserType == 'CONTRACTOR';
	}
  const { user } = userInfo;
  const [jobType, setJobType] = useState(record?.jobType || '');
  const [jobDescription, setJobDescription] = useState(record?.jobDecsription || "");
  const [jobTitle, setJobTitle] = useState(record?.jobTitle || '');
  const [jobDeliveryDate, setJobDeliveryDate] = useState(record?.jobDeliveryDate ? new Moment(record.jobDeliveryDate) : null);
  const [jobExpectedDeliveryDate, setJobExpectedDeliveryDate] = useState(record?.jobExpectedDeliveryDate ? new Moment(record.jobExpectedDeliveryDate) : null);
  const [jobStatus, setJobStatus] = useState(record?.jobStatus || 'ISSUE_RAISED');
  const [allowedObj] = useState(() => getAllowedStatus(record?.jobStatus));
  const [quoteAmount, setQuoteAmount] = useState(record?.quoteAmount || '');
  const [quoteDescription, setQuoteDescription] = useState(record?.quoteDescription || '');
  const [issuedTo, setIssuedTo] = useState(record?.issuedTo || null);
  const [allJobTypes, setAllJobTypes] = useState([]);
  const [contractors, setContractors] = useState(() => {
    return users.filter(user => user.accountUserType === 'CONTRACTOR')
  })

  const onSubmit = async () => {
    try {
      const req = {
        jobTitle,
        jobDecsription: jobDescription,
        jobType,
        jobStatus,
        quoteAmount,
        quoteDescription,
        jobDeliveryDate: jobDeliveryDate?.valueOf(),
        jobExpectedDeliveryDate: jobExpectedDeliveryDate?.valueOf(),
        issuedTo
      };
      let res = null;
      if (isEdit) {
        await updateJob(req, record?.jobId);
      } else {
        res = await addJob(req);
      }
      if (res?.errors) {
        setErrors([...Object.values(res?.errors)]);
      } else if (res?.error) {
        setErrors([res?.error]);
      } else {
        const isSuccess = true
        handleClose(isSuccess);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getAllUsers = async () => {
    const res = await getUsers();
    if (res?.accountUsers) {
      const users = res.accountUsers.map(accountUser => ({
        key: accountUser.accountUserId,
        ...accountUser
      }))
      setUsers(users);
    }
  };

  useEffect(() => {
    users.length || getAllUsers();
  }, []);

  useEffect(() => {
    getAllJobTypes();
  }, []);

  useEffect(() => {
    setContractors(users.filter(user => user.accountUserType === 'CONTRACTOR'))
  }, [users, setContractors]);

  useEffect(() => {
    if (!isEdit && visible) {
      setJobType('');
      setJobDescription("");
      setJobTitle('');
      setJobDeliveryDate(null);
      setJobExpectedDeliveryDate(null);
      setJobStatus('');
      setQuoteAmount('');
      setQuoteDescription([]);
      setIssuedTo(null);
    }
  }, [visible, isEdit])

  const getAllJobTypes = async () => {
    const jobTypes = await getJobTypes();
    if (Array.isArray(jobTypes)) {
      setAllJobTypes(jobTypes);
    }
  };

  const onClose = async () => {
    handleClose(false);
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    <Drawer
        destroyOnClose
        title={isEdit ? "Edit Job" : "Add Job"}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          initialValues={{ remember: true }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="jobTitle"
                label="Job Title"
                initialValue={jobTitle}
                rules={[
                  {
                    required: true,
                    message: "Please enter job title",
                  },
                ]}
              >
                <Input
                  placeholder="Job Title"
                  value={jobTitle}
                  onChange={(e) => {
                    setJobTitle(e.target.value);
                  }}
                  disabled={isContractor}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="jobDescription"
                label="Job Description"
                initialValue={jobDescription}
                rules={[
                  {
                    required: true,
                    message: "Please enter job description",
                  },
                ]}
              >
                <Input.TextArea
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                  }}
                  rows={4}
                  placeholder="Please enter job description"
                  disabled={isContractor}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item
                name="jobType"
                label="Job Type"
                initialValue={jobType}
                rules={[
                  {
                    required: true,
                    message: "Please enter job type",
                  },
                ]}
              >
                <Select
                  placeholder="Please select job type"
                  disabled={isContractor}
                  value={jobType}
                  onChange={(value) => {
                    setJobType(value);
                  }}
                  // disabled={isEdit}
                >
                  {allJobTypes?.map((jobType, index) => <Option key={index} value={jobType}>{jobType}</Option>)}   
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name="jobStatus"
                label="Job Status"
                initialValue={jobStatus}
              >
                <Select
                  value={jobStatus}
                  onChange={(value) => {
                    setJobStatus(value);
                  }}
                  disabled={!allowedObj.allowedUsers.includes(user.accountUserType)}
                >
                  {allowedObj?.allowedActions?.map((status, index) => <Option key={index} value={status}>{status}</Option>)}   
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {
            !isCustomer && <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="jobExpectedDeliveryDate"
                label="Expected Delivery Date"
                initialValue={jobExpectedDeliveryDate || undefined}
                rules={[
                  {
                    required: true,
                    message: "Please enter valid date",
                  },
                ]}
              >
                <DatePicker
                  style={{
                    width: '100%'
                  }}
                  placeholder="dd/mm/yyyy"
                  defaultValue={jobExpectedDeliveryDate || undefined}
                  onChange={(e) => {
                    setJobExpectedDeliveryDate(e.toDate());
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                  name="jobDeliveryDate"
                  label="Delivery Date"
                  rules={[
                    {
                      required: true,
                      message: "Please enter job title",
                    },
                  ]}
                  initialValue={jobDeliveryDate || undefined}
                >
                  <DatePicker
                    style={{
                      width: '100%'
                    }}
                    placeholder="dd/mm/yyyy"
                    defaultValue={jobDeliveryDate || undefined}
                    onChange={(e) => {
                      setJobDeliveryDate(e.toDate());
                    }}
                  />
                </Form.Item>
              </Col>
          </Row>
}
          
          {
            !isContractor && <>
              <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="quoteAmount"
                  label="Quote Amount"
                  initialValue={quoteAmount}
                >
                  <Input
                    placeholder="Quote Amount"
                    value={quoteAmount}
                    onChange={(e) => {
                      setQuoteAmount(e.target.value);
                    }}
                    disabled={!isAdmin}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                  name="quoteDescription"
                  label="Quote Description"
                  initialValue={quoteDescription}
                >
                  <Input
                    placeholder="Quote Description"
                    value={quoteDescription}
                    onChange={(e) => {
                      setQuoteDescription(e.target.value);
                    }}
                    disabled={!isAdmin}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                    name="issuedTo"
                    label="Issued To"
                    initialValue={issuedTo}
                  >
                    <Select
                      placeholder="Please select a contractor"
                      disabled={!isAdmin}
                      value={issuedTo}
                      onChange={(value) => {
                        setIssuedTo(value);
                      }}
                    >
                      {contractors?.map((user) => <Option key={user.accountUserId} value={user.accountUserId}>{user.firstname + " " + user.lastname}</Option>)}   
                    </Select>
      
                  </Form.Item>
                </Col>
              </Row>
            </>
          }
        </Form>
      </Drawer>
  );
};

export default JobForm;

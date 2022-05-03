import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Row,
  Col,
  Input,
  Drawer,
  Form,
  Button,
  Select,
  Typography,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { addUser, updateUser } from "../../services/userServices";
const { Text } = Typography;
const { Option } = Select;

const UserForm = ({ record = {}, isEdit = false, handleSubmit = null }) => {
  const [visible, setVisible] = useState(false);
  const [firstname, setFirstname] = useState(record.firstname || "");
  const [lastname, setLastname] = useState(record.lastname || "");
  const [email, setEmail] = useState(record.email || "");
  const [password, setPassword] = useState(record.password || "");
  const [accountUserType, setAccountUserType] = useState(record.accountUserType || "");
  const [errors, setErrors] = useState([]);
  const [userid, setUserId] = useState(record.accountUserId || "");

  useEffect(() => {
    if (!isEdit && !visible) {
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      setAccountUserType('');
      setErrors([]);
      setUserId('');
    }
  }, [visible, isEdit])

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = async () => {
    setVisible(false);
    console.log('onClose')
  };

  const onSubmit = async () => {
    try {
      let res = null;
      if (isEdit) {
        const req = {
          firstname,
          lastname,
          password,
        };
        res = await updateUser (req, userid)
      } else {
        const req = {
          accountUserType,
          firstname,
          lastname,
          email,
          password,
        };
        res = await addUser(req);
      }
      if (res?.errors) {
        setErrors([...Object.values(res?.errors)]);
      } else if (res?.error) {
        setErrors([res?.error]);
      } else {
        handleSubmit(true);
        setVisible(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isEdit ? (
        <EditOutlined style={{ color: "#52c41a" }} onClick={showDrawer} />
      ) : (
        <Button type="primary" onClick={showDrawer}>
          <PlusOutlined /> Add User
        </Button>
      )}
      <Drawer
        destroyOnClose
        title={isEdit ? 'Edit User' : 'Add User'}
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
                name="accountUserType"
                label="User Type"
                initialValue={accountUserType}
                rules={[
                  {
                    required: true,
                    message: "Please select Your User Type",
                  },
                ]}
              >
                <Select
                  placeholder="Please select User Type"
                  onChange={(val) => setAccountUserType(val)}
                  value={accountUserType}
                  disabled={isEdit}
                >
                  <Option value="ADMIN">ADMIN</Option>
                  <Option value="CONTRACTOR">CONTRACTOR</Option>
                  <Option value="CUSTOMER">CUSTOMER</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                initialValue={firstname}
                rules={[{ required: true, message: "Please enter First Name" }]}
              >
                <Input
                  placeholder="Please enter First Name"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                initialValue={lastname}
                rules={[
                  {
                    required: true,
                    message: "Please enter Last Name",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter Last Name"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                initialValue={email}
                rules={[
                  {
                    required: true,
                    message: "Please enter Email",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter Email"
                  value={email}
                  disabled={isEdit}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                initialValue={password}
                rules={[
                  {
                    required: true,
                    message: "Please enter password",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Please enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            {errors?.map((err, index) => (
              <div key={index} style={{ width: "100%" }}>
                <Text type="danger">{err}</Text>
              </div>
            ))}
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default UserForm;

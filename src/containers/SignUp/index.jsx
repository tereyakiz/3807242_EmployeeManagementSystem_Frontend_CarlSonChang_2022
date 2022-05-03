import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { setCookie } from "../../common/utils";
import { signUpUser } from "../../services/userServices";
const { Text } = Typography;

const SignUP = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = async () => {
    try {
      const req = {
        firstname,
        lastname,
        email,
        password,
        accountUserType: 'CUSTOMER'
      };
      const res = await signUpUser(req);
      console.log(res)
      if (res?.errors) {
        setErrors([...Object.values(res?.errors)]);
      } else if (res?.error) {
        setErrors([res?.error]);
      } else if (res?.error_message) {
        setErrors([res?.error_message]);
      } else {
        if (res?.jwt) {
          setCookie("jwt", res?.jwt);
          setCookie("accountId", res?.user?.accountId);
          setCookie("accountUserId", res?.user?.accountUserId);
          setCookie("email", res?.user?.email);
          setCookie("firstname", res?.user?.firstname);
          setCookie("lastname", res?.user?.lastname);
          setCookie("accountUserType", res?.user?.accountUserType);
          setCookie("", res?.tokenInfo?.refreshToken);
          window.location.reload();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your First Name!" }]}
        >
          <Input
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your Last Name!" }]}
        >
          <Input
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
      {errors?.map((err, index) => (
              <div key={index} style={{ width: "100%" }}>
                <Text type="danger">{err}</Text>
              </div>
      ))}
    </div>
  );
};

export default SignUP;

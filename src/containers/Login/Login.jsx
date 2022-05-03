import { Form, Input, Button, Checkbox } from "antd";
import { setCookie } from "../../common/utils";
import { login } from "../../services/authServices";

const Login = () => {
  const onFinish = async (values) => {
    try {
      const res = await login(values);
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
    } catch (e) {
      console.error("eee", e);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;

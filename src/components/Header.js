import React, { useContext, useState } from "react";
import { Avatar, Menu, Dropdown, Modal, Button, Form, Input } from "antd";
import { updateUser } from "../services/userServices";
import {
  UserOutlined,
  EditOutlined,
  KeyOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import color from "../common/color";
import { eraseCookie, getCookie } from "../common/utils";
import { AppContext } from "../store/AppState";

const AvtarContainer = styled.div`
  /* position: absolute;
  right: 5%;
  top: 1%; */
  padding-right: 40px;
`;
const HeadingLogo = styled.div`
  font-size: 30px;
  padding-left: 40px;
  font-weight: 600;
  color: #fff;
`;

const HeaderContainer = styled.div`
  background-color: ${color.primary};
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
const EditButton = styled.button`
  background-color: transparent;
  border: none;
  width: 100%;
  text-align: left;
`;

function Header() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPwdDialog, setShowPwdDialog] = useState(false);
  const { userInfo } = useContext(AppContext);
  const user = userInfo?.user;

  const openEditProfile = () => {
    setShowEditProfile(true);
  };

  const closeEditProfile = () => {
    setShowEditProfile(false);
  };


  const openEditPassword = () => {
    setShowPwdDialog(true);
  };

  const handleOkChangePass = () => {
    setShowPwdDialog(false);
  };

  const closeEditPassword = () => {
    setShowPwdDialog(false);
  };

  const handleSubmit = async (data = {}) => {
    const {firstname, lastname, password } = data;
    const req = {
      firstname: firstname || user.firstname,
      lastname: lastname || user.lastname
    };
    if (password) {
      req.password = password || getCookie('password')
    }
    try {
      const res = await updateUser(req, user.accountUserId)
      if (!res?.errors && !res?.error) {
        if (password) {
          closeEditPassword();
        } else {
          closeEditProfile();
        }
      }
    } catch (err) {
      console.log(e);
    }
  }
  const LogoutUser = () => {
    eraseCookie("jwt");
    eraseCookie("accountId");
    eraseCookie("email");
    eraseCookie("firstname");
    eraseCookie("lastname");
    eraseCookie("accountUserType");
    eraseCookie("refreshToken");

    window.location.reload();
  };
  const menu = (
    <Menu>
      <Menu.Item
        icon={<EditOutlined style={{ fontSize: "15px", color: "#1791FF" }} />}
        key='edit'
      >
        <EditButton onClick={openEditProfile}>Edit</EditButton>
        <Modal
          title="Edit Profile"
          visible={showEditProfile}
          onCancel={closeEditProfile}
        >
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="First Name"
              name="firstname"
              initialValue={user.firstname}
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input value={user.firstname} />
            </Form.Item>
            <Form.Item
              label="Last Name"
              initialValue={user.lastname}
              name="lastname"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input value={user.lastname}/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Menu.Item>
      <Menu.Item
        icon={<KeyOutlined style={{ fontSize: "15px", color: "#1791FF" }} />}
        key='changepwd'
      >
        <EditButton onClick={openEditPassword}>Change Password</EditButton>
        <Modal
          title="Change Password"
          visible={showPwdDialog}
          onOk={handleOkChangePass}
          onCancel={closeEditPassword}
        >
          <Form
            onFinish={handleSubmit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[
                { required: true, message: "Please input your Old Password!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your New Password!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Menu.Item>
      <Menu.Item
      key='logout'
        onClick={LogoutUser}
        icon={<LogoutOutlined style={{ fontSize: "15px", color: "#1791FF" }} />}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <HeaderContainer>
        <HeadingLogo>Task Manager</HeadingLogo>

        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <AvtarContainer>
              <Avatar size={44} icon={<UserOutlined />} />
            </AvtarContainer>
          </a>
        </Dropdown>
      </HeaderContainer>
    </>
  );
}

export default Header;

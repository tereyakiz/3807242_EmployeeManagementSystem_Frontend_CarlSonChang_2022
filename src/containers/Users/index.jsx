import React, { useState, useEffect, useContext } from "react";
import { getUsers } from "../../services/userServices";
import { Table, Space } from "antd";
import UserForm from "./UserForm";
import styled from "@emotion/styled";
import { AppContext } from '../../store/AppState';

const Container = styled.div`
  width: 100%;
  padding: 10px;
`;
const AddButtonContainer = styled.div`
  display: row;
  margin-bottom: 10px;
`;
const TableContainer = styled.div`
  display: row;
  @media (max-width: 991px) {
    left: 70%;
  }
`;
const Users = () => {
  const { users, setUsers } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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
    getAllUsers();
  }, []);

  const getColumms = () => {
    return [
      {
        title: "First Name",
        dataIndex: "firstname",
        key: "firstname",
      },
      {
        title: "Last Name",
        dataIndex: "lastname",
        key: "lastname",
      },
      {
        title: "Email",
        key: "email",
        dataIndex: "email",
      },
      {
        title: "User Type",
        dataIndex: "accountUserType",
        key: "accountUserType",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a style={{ marginRight: 40 }} onClick={showDrawer}>
              <UserForm isEdit={true} record={record} handleSubmit={getAllUsers} />
            </a>
          </Space>
        ),
      },
    ];
  };

  return (
    <Container>
      <AddButtonContainer>
        <UserForm handleSubmit={getAllUsers}/>
      </AddButtonContainer>
      <TableContainer>
        <Table columns={getColumms()} dataSource={users} />
      </TableContainer>
    </Container>
  );
};

export default Users;

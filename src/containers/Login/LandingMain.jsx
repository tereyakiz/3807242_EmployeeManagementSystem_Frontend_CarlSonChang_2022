import styled from "@emotion/styled";
import React, { useState } from "react";
import color from "../../common/color";
import bgimage from "../../assets/images/bg-image.png";
import { Modal, Button } from "antd";
import Login from "./Login";
import SignUP from "../SignUp";
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;
const Heading = styled.h1`
  color: ${color.primary};
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoginButton = styled.button`
  padding: 15px;
  background-color: ${color.white};
  border: none;
  font-size: 20px;
  font-weight: 600;
  :hover {
    border-bottom: 2px solid #1791ff;
    background-color: #fafafa;
    margin-left: 20px;
  }
`;

const SignupButton = styled.button`
  padding: 15px;
  background-color: ${color.white};
  border: none;
  font-size: 20px;
  font-weight: 600;
  :hover {
    border-bottom: 2px solid #1791ff;
    background-color: #fafafa;
  }
`;
const MainContainer = styled.div`
    width: 100%;`;

const Container = styled.div`
  /* background-image: "url(../../assets/images/bg-image.png)"; */
  /* background-image: url(require("../../assets/images/bg.png"));
  background-size: "cover";
  height: 100vh;
  background-repeat: no-repeat; */
`;
const ContainerHeading = styled.h1`
  text-align: center;
  font-size: 60px;
  font-weight: 900;
  margin-top: 130px;
`;
const ButtonBox = styled.div`
  text-align: center;
`;

const StartButton = styled.button`
  font-size: 18px;
  background-color: #1791ff;
  padding: 15px;
  border: none;
  color: #fff;
  border-radius: 20px;
  width: 200px;
  :hover {
    background-color: #1890ff;
    cursor: pointer;
  }
`;
// const Imagebg = styled.img``;

const LandingMain = () => {
  console.log('render login')
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isModalVisibles, setIsModalVisibles] = useState(false);

  const showModals = () => {
    setIsModalVisibles(true);
  };
  const handleOks = () => {
    setIsModalVisibles(false);
  };

  const handleCancels = () => {
    setIsModalVisibles(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
    <MainContainer>
      <HeaderContainer>
        <Heading>Task Manager</Heading>
        <ButtonContainer>
          <LoginButton onClick={showModal}>Log in</LoginButton>
          <SignupButton onClick={showModals}>Sign up</SignupButton>
        </ButtonContainer>
      </HeaderContainer>
      <Container>
        <ContainerHeading>
          Organize it all <br></br>with Task Manager
        </ContainerHeading>
        <ButtonBox>
          <StartButton onClick={showModal}>GET STARTED</StartButton>
        </ButtonBox>
        {/* <Imagebg src={bgimage} /> */}
      </Container>
      <Modal
        title="Login"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Login />
      </Modal>
      <Modal
        title="Sign up"
        visible={isModalVisibles}
        onOk={handleOks}
        onCancel={handleCancels}
      >
        <SignUP />
      </Modal>
      </MainContainer>
    </>
  );
};

export default LandingMain;

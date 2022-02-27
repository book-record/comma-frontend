import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import googleLogo from "../../assets/googleButton.png";
import { Title } from "../../common/constants/FONT";
import { firebaseLogin } from "../../network";
import { signIn } from "../../store/loginSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginButton = async () => {
    const results = await firebaseLogin();
    dispatch(signIn(results));
    navigate("/");
  };

  return (
    <BackGround>
      <Container>
        <Title>
          <h1>
            쉼표<span>,</span>
          </h1>
        </Title>
        <GoogleButton type="button" onClick={handleLoginButton}>
          <img src={googleLogo} alt="googleButton" />
        </GoogleButton>
      </Container>
    </BackGround>
  );
}

const BackGround = styled.div`
  display: flex;
  position: absolute;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #e19894;
`;

const Container = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 900px;
  height: 600px;
  border-radius: 10px;
  background-color: white;
`;

const GoogleButton = styled.button`
  margin-top: 180px;
  border: none;
  background: none;
`;

export default Login;

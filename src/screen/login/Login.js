import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { firebaseLogin } from "../../api/auth";
import googleLogo from "../../assets/googleButton.png";
import { signIn } from "../../store/userSlice";

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
        <h1>
          쉼 표<span>,</span>
        </h1>
        <GoogleButton type="button" onClick={handleLoginButton}>
          <img src={googleLogo} alt="googleButton" />
        </GoogleButton>
      </Container>
    </BackGround>
  );
}

const BackGround = styled.div`
  display: flex;
  position: fixed;
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
  h1 {
    font-family: "Nanum Gothic", sans-serif;
    font-size: 120px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  span {
    font-family: "Nanum Myeongjo", serif;
    font-size: 180px;
  }
`;

const GoogleButton = styled.button`
  margin-top: 150px;
  border: none;
  background: none;
  img {
    width: 250px;
  }
  &:hover {
    background: #eceff1;
    cursor: pointer;
    transform: translateY(3px);
  }
`;

export default Login;

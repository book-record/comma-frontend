import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function NotFound() {
  const navigate = useNavigate();
  return (
    <BackGround>
      <Container>
        <h1>404</h1>
        <p>This page is missing</p>
        <button type="button" onClick={() => navigate("/")}>
          메인페이지
        </button>
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
  width: 900px;
  height: 600px;
  text-align: center;
  margin: 0 auto;
  border-radius: 10px;
  background-color: white;
  h1 {
    margin-bottom: 20px;
    font-family: "Nanum Gothic", sans-serif;
    font-size: 120px;
    font-weight: 700;
  }
  p {
    font-size: 40px;
  }
  button {
    width: 100px;
    height: 50px;
    border: none;
    margin-top: 30px;
    cursor: pointer;
    font-size: 15px;
  }
`;

export default NotFound;

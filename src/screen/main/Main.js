import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Title } from "../../common/constants/FONT";

function Main() {
  const navigate = useNavigate();
  const handleMoveBookList = () => {
    navigate("/bookList");
  };

  const handleMoveReocrdList = () => {
    navigate("/record");
  };

  return (
    <Background>
      <Halfground type="button" onClick={handleMoveBookList}>
        <Title>
          <h2>한줄평</h2>
        </Title>
      </Halfground>

      <Halfground type="button" onClick={handleMoveReocrdList}>
        <Title>
          <h2>타임캡슐</h2>
        </Title>
      </Halfground>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  border: none;
  margin: 0 auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Halfground = styled.button`
  border: none;
  flex-direction: row;
  width: 50%;
  height: 100%;
  background: #707274;
  &:hover {
    background: #e19894;
    transition: all 0.35s ease-in;
  }
`;

export default Main;

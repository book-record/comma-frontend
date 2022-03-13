import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Main() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.id);

  const handleMoveBookList = () => {
    navigate("/bookList");
  };

  const handleMoverReportList = () => {
    navigate(`/reportList/${id}`);
  };

  return (
    <Background>
      <Halfground type="button" onClick={handleMoveBookList}>
        <h2>한줄평</h2>
      </Halfground>

      <Halfground type="button" onClick={handleMoverReportList}>
        <h2>타임캡슐</h2>
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
  h2 {
    color: white;
    font-family: "Nanum Gothic", sans-serif;
    font-size: 120px;
    font-weight: 700;
  }
  &:hover {
    transition: all 0.35s ease-in;
    background: #e19894;
  }
`;

export default Main;

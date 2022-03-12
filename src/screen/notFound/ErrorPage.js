import React from "react";
import styled from "styled-components";

function ErrorPage() {
  return (
    <Background>
      <div>
        <h2>500 Server Error</h2>
        This page is not working
      </div>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 50px;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #e0e0e0;
  div {
    margin-bottom: 300px;
  }
`;

export default ErrorPage;

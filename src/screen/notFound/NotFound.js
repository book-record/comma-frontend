import React from "react";
import styled from "styled-components";

function NotFound() {
  return (
    <NotFoundPage>
      <div>
        <h2>404</h2>
        This is not the web page you are looking for
      </div>
    </NotFoundPage>
  );
}

const NotFoundPage = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 40px;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #e0e0e0;
  div {
    margin-bottom: 300px;
  }
`;

export default NotFound;

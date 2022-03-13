import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function LinkHeader({ link, title }) {
  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <Header>
      <StyledLink to="/">쉼표</StyledLink>
      <div>
        <StyledLink to={link}>{title}</StyledLink>
        <LogoutButton type="button" onClick={handleLogout}>
          <StyledLink to="/login">로그아웃</StyledLink>
        </LogoutButton>
      </div>
    </Header>
  );
}

const StyledLink = styled(Link)`
  padding: 4px 8px;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  color: #fff;
  font-size: 35px;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 700;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  height: 60px;
  background: #e19894;
`;

const LogoutButton = styled.button`
  padding: 25px;
  border: none;
  background: none;
`;

export default LinkHeader;

LinkHeader.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

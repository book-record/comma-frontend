import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function PageButton({ onClick, disabled, title }) {
  return (
    <Button type="button" onClick={onClick} disabled={disabled}>
      {title}
    </Button>
  );
}

const Button = styled.button`
  border: none;
  border-radius: 4px;
  padding: 8px;
  background: black;
  color: white;
  font-size: 18px;
  margin: 8px;
  margin-top: 10px;
  &:hover {
    background: #ffeb3b;
    color: black;
    cursor: pointer;
    transform: translateY(-2px);
  }
  &[disabled] {
    color: white;
    background: grey;
    cursor: revert;
    transform: revert;
  }
`;

export default PageButton;

PageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

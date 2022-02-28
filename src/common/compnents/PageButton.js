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
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  background: black;
  color: white;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
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

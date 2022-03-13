import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function ActiveButton({ onClick, disabled, title }) {
  return (
    <Button type="button" onClick={onClick} disabled={disabled}>
      {title}
    </Button>
  );
}

const Button = styled.button`
  width: 110px;
  height: 50px;
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin: 5px;
  background-color: #da6d58;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
`;

export default ActiveButton;

ActiveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

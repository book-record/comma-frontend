import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function OnModalButton({ onClick, text }) {
  return (
    <ModalButton type="button" onClick={onClick}>
      {text}
    </ModalButton>
  );
}

const ModalButton = styled.button`
  margin: 10px 20px;
  border: none;
  background: none;
  font-family: "Nanum Gothic", sans-serif;
  font-size: 20px;
  font-weight: 700;
`;

export default OnModalButton;

OnModalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

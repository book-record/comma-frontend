import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import ActiveButton from "./ActiveButton";

function ModalBackground({ show, onClose, onClick, children, title }) {
  if (!show) {
    return null;
  }
  return (
    <ModalBack onClick={onClose}>
      <ModalInside onClick={(e) => e.stopPropagation()}>
        <ModalContent>{children}</ModalContent>
        <ButtonContainer>
          <ActiveButton onClick={onClose} disabled={false} title="닫기" />
          <ActiveButton onClick={onClick} disabled={false} title={title} />
        </ButtonContainer>
      </ModalInside>
    </ModalBack>
  );
}

const ModalBack = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #ffdb92;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalInside = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 1300px;
  height: 650px;
  background-color: #fff1e8;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  width: 1000px;
  height: 470px;
  background-color: #fff;
  border-radius: 10px;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  width: 77%;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

export default ModalBackground;

ModalBackground.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};
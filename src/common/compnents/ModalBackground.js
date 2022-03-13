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
          {title && (
            <ActiveButton onClick={onClick} disabled={false} title={title} />
          )}
        </ButtonContainer>
      </ModalInside>
    </ModalBack>
  );
}

const ModalBack = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #ffdb92;
`;

const ModalInside = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 640px;
  border-radius: 10px;
  background-color: #fff1e8;
`;

const ModalContent = styled.div`
  display: flex;
  width: 1000px;
  height: 490px;
  border-radius: 10px;
  margin-top: 40px;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #fff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 84%;
  margin-top: 20px;
`;

export default ModalBackground;

ModalBackground.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

ModalBackground.defaultProps = {
  onClick: () => {},
  title: "",
  children: {},
};

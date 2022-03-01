import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function ModalBackground({ show, onClose }) {
  if (!show) {
    return null;
  }
  return (
    <ModalBack onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div>
          <div>
            <ModalTitle>Modal title</ModalTitle>
          </div>
          <ModalBody>This is modal content</ModalBody>
          <div>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </ModalContent>
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

const ModalContent = styled.div`
  width: 1000px;
  height: 600px;
  background-color: #fff1e8;
  border-radius: 10px;
`;

const ModalTitle = styled.h4`
  margin: 0;
`;

const ModalBody = styled.div`
  padding: 10px;
`;

export default ModalBackground;

ModalBackground.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

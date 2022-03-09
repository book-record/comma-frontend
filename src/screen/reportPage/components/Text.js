import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function Text({ text, onChange }) {
  return (
    <TextInput
      placeholder="본문을 입력하세요"
      type="text"
      value={text}
      onChange={onChange}
    />
  );
}

const TextInput = styled.textarea`
  width: 400px;
  height: 400px;
  resize: none;
`;

export default Text;

Text.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

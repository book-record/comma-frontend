import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function Title({ title, onChange }) {
  return (
    <TitleInput
      placeholder="제목을 입력하세요"
      type="text"
      value={title}
      onChange={onChange}
    />
  );
}

const TitleInput = styled.input`
  margin-top: 50px;
  margin-bottom: 20px;
  width: 400px;
  font-size: 30px;
  border: none;
  text-align: center;
  border-bottom: 1px solid black;
  :focus {
    outline: none;
  }
`;

export default Title;

Title.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

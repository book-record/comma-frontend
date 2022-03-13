/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function LikeContainer({ onClick, userId, review }) {
  return (
    <HeartContainer>
      <div onClick={onClick}>
        {review.likes.includes(userId) ? (
          <p id={review._id}>♥️</p>
        ) : (
          <p id={review._id}>♡</p>
        )}
      </div>
      <p>{review.likes.length}</p>
    </HeartContainer>
  );
}

const HeartContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  padding: 0 5px;
  margin-top: 18px;
  margin-bottom: 14px;
  border-radius: 10px;
  height: 40px;
  background: #f4495b;
  p {
    margin-left: 4px;
    color: #fff;
    font-size: 18px;
  }
`;
export default LikeContainer;

LikeContainer.propTypes = {
  onClick: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  review: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

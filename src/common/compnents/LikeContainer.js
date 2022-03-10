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
          <div id={review._id}>❤️</div>
        ) : (
          <div id={review._id}>♡</div>
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
  background: #f4495b;
  padding: 0 5px;
  margin-top: 18px;
  margin-bottom: 14px;
  height: 40px;
  border-radius: 10px;
  p {
    color: #fff;
    font-size: 15px;
    margin-left: 4px;
  }
`;
export default LikeContainer;

LikeContainer.propTypes = {
  onClick: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  review: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

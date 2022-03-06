import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function Review({ book, userId, onClick }) {
  return book.reviewHistory?.map((reviewer, i) => (
    <ReviewContainer key={reviewer._id}>
      <div>{i + 2}번째</div>
      <audio controls>
        <track kind="captions" />
        <source src={reviewer.sound} />
      </audio>
      <div>{reviewer.nickname}</div>
      <HeartButton onClick={onClick}>
        {reviewer.likes.includes(userId) ? (
          <div id={reviewer._id}>❤️</div>
        ) : (
          <div id={reviewer._id}>♡</div>
        )}
      </HeartButton>
      <div>{reviewer.likes.length}</div>
    </ReviewContainer>
  ));
}

const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 92%;
  audio {
    width: 280px;
    height: 30px;
  }
`;

const HeartButton = styled.div`
  margin-top: 14px;
  font-size: 30px;
  height: 100%;
  border: none;
`;

export default Review;

Review.propTypes = {
  userId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

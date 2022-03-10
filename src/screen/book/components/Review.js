import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import LikeContainer from "../../../common/compnents/LikeContainer";

function Review({ book, userId, onClick }) {
  return book.reviewHistory?.map((reviewer, i) => (
    <ReviewContainer key={reviewer._id}>
      <p>{i + 2}등</p>
      <audio controls>
        <track kind="captions" />
        <source src={reviewer.sound} />
      </audio>
      <div>{reviewer.nickname}</div>
      <LikeContainer onClick={onClick} userId={userId} review={reviewer} />
    </ReviewContainer>
  ));
}

const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  audio {
    width: 250px;
    height: 30px;
  }
`;

export default Review;

Review.propTypes = {
  userId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

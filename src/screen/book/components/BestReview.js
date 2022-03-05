import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function BestReview({ review, userId, onClick }) {
  return (
    <BackGround>
      <h2>최고의 한줄평</h2>
      <audio controls>
        <track kind="captions" />
        <source src={review.content} />
      </audio>
      <UserInfo>
        <p>{review.nickname}</p>
        <GoodContaniner onClick={onClick}>
          {review.likes.includes(userId) ? (
            <div id={review._id}>❤️</div>
          ) : (
            <div id={review._id}>♡</div>
          )}
        </GoodContaniner>
        <p>좋아요{review.likes.length}</p>
      </UserInfo>
    </BackGround>
  );
}

const BackGround = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  top: 0;
  left: 0;
  margin-top: 35px;
  padding: 20px;
  background: #e19894;
  audio {
    width: 280px;
    height: 30px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-family: "Nanum Gothic Coding", monospace;
  font-size: 25px;
`;

const GoodContaniner = styled.div`
  margin-top: 15px;
`;

export default BestReview;

BestReview.propTypes = {
  review: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  userId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import LikeContainer from "../../../common/compnents/LikeContainer";

function BestReview({ review, userId, onClick }) {
  return (
    <BackGround>
      <h2>최고의 한줄평</h2>
      <audio controls>
        <track kind="captions" />
        <source src={review.sound} />
      </audio>
      <UserInfo>
        <p>{review.nickname}</p>
        <LikeContainer onClick={onClick} userId={userId} review={review} />
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
  padding: 20px;
  margin-top: 30px;
  background: #eceff1;
  font-family: "Nanum Gothic Coding", monospace;
  audio {
    width: 280px;
    height: 30px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 25px;
`;

export default BestReview;

BestReview.propTypes = {
  review: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  userId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

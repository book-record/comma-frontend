import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function BookList({ posts, onClick }) {
  return (
    <BookListContainer>
      {posts?.map((post) => {
        const dDay = dayjs(post.dDay);

        const validateDate = (day) => {
          const now = dayjs(new Date());
          if (day.diff(now, "d") > 1) {
            return `D-day ${day.diff(now, "d")}일`;
          }

          if (day.diff(now, "h") > 0) {
            return `D-day ${day.diff(now, "h")}시간`;
          }

          if (day.diff(now, "m") > 1) {
            return `D-day ${day.diff(now, "m")}분`;
          }

          return "D-day";
        };

        const completeDday = validateDate(dDay);

        return (
          <BookFrame
            id={post._id}
            key={post._id}
            onClick={onClick}
            data-day={completeDday}
          >
            <img src={post.imageUrl} alt={posts.bookTitle} />
            <p>{post.bookTitle}</p>
            {post.dDay && (
              <DdayText date={completeDday}>{completeDday}</DdayText>
            )}
          </BookFrame>
        );
      })}
    </BookListContainer>
  );
}

const BookListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 320px);
  grid-template-rows: repeat(2, 270px);
  gap: 20px;
  justify-content: center;
`;

const BookFrame = styled.div`
  position: relative;
  margin: 0 auto;
  text-align: center;
  width: 220px;
  background-color: #fff;
  border-radius: 2px 20px 20px 2px;
  box-shadow: 5px 2px 3px 3px gray;
  img {
    margin-top: 3px;
    width: 150px;
    height: 200px;
  }
  p {
    font-family: "Nanum Myeongjo", serif;
    font-size: 12px;
  }
`;

const DdayText = styled.p`
  font-family: "Nanum Myeongjo", serif;
  font-size: 12px;
  color: ${({ date }) => (date === "D-day" ? "red" : "#000")};
`;

export default BookList;

BookList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
  onClick: PropTypes.func.isRequired,
};

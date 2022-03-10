import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { validateDate } from "../utils/utilsFunc";

function BookList({ posts, onClick }) {
  return (
    <BookListContainer>
      {posts?.map((post) => {
        const finishDate = dayjs(post.finishDate);
        const currentDate = dayjs(new Date());

        const completeDday = validateDate(currentDate, finishDate);
        const title =
          post.bookTitle.length > 16
            ? post.bookTitle.slice(0, 16).concat("...")
            : post.bookTitle;

        return (
          <BookFrame
            id={post._id}
            key={post._id}
            onClick={onClick}
            data-day={completeDday}
          >
            <img src={post.imageUrl} alt={posts.bookTitle} />
            <p>{title}</p>
            {post.finishDate && (
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
  width: 230px;
  background-color: #fff;
  border-radius: 2px 20px 20px 2px;
  box-shadow: 3px 2px 3px 3px #e0e0e0;
  img {
    margin-top: 5px;
    width: 150px;
    height: 200px;
  }
  p {
    font-family: "Nanum Gothic", sans-serif;
    font-size: 13px;
  }
  &:hover {
    background: #eceff1;
    cursor: pointer;
    transform: translateY(-4px);
  }
`;

const DdayText = styled.p`
  font-family: "Nanum Gothic", sans-serif;
  font-size: 10px;
  color: ${({ date }) => (date === "D-day" ? "red" : "#000")};
`;

export default BookList;

BookList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
  onClick: PropTypes.func.isRequired,
};

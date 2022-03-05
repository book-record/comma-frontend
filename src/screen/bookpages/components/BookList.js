import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function BookList({ posts, onClick }) {
  return (
    <BookListContainer>
      {posts.map((post) => (
        <BookFrame id={post._id} key={post._id} type="button" onClick={onClick}>
          <img id={post._id} src={post.imageUrl} alt={posts.bookTitle} />
          <p id={post._id}>{post.bookTitle}</p>
        </BookFrame>
      ))}
    </BookListContainer>
  );
}

const BookListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 320px);
  grid-template-rows: repeat(2, 260px);
  gap: 20px;
  justify-content: center;
`;

const BookFrame = styled.button`
  position: relative;
  margin: 0 auto;
  width: 250px;
  background-color: #fff;
  border-radius: 2px 20px 20px 2px;
  box-shadow: 2px 1px 3px gray;
  img {
    width: 150px;
    height: 200px;
  }
  p {
    font-family: "Nanum Myeongjo", serif;
    font-size: 12px;
  }
`;

export default BookList;

BookList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
  onClick: PropTypes.func.isRequired,
};

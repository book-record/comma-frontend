import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

function BookList({ posts }) {
  return (
    <BookListContainer>
      {posts.map((post) => (
        <BookFrame key={post._id} type="button">
          <Image src={post.imageUrl} alt={posts.bookTitle} />
          <BookTitle>{post.bookTitle}</BookTitle>
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
  margin: 0 auto;
  width: 250px;
  background-color: white;
  border-radius: 2px 20px 20px 2px;
  box-shadow: 2px 1px 3px gray;
`;

const Image = styled.img`
  width: 150px;
  height: 200px;
`;

const BookTitle = styled.p`
  font-family: "Nanum Myeongjo", serif;
  font-size: 12px;
`;

export default BookList;

BookList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
};

import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";

import LinkHeader from "../../common/compnents/LinkHeader";
import PageButton from "../../common/compnents/PageButton";
import { getBookList } from "../../service/book";

function BookList() {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    const callBookList = async () => {
      try {
        const { totalPage, bookList } = await getBookList(pageNumber);
        setPosts(bookList);
        setNumberOfPages(totalPage);
      } catch (error) {
        throw new Error("책 리스트를 불러오지 못했습니다");
      }
    };

    callBookList();
  }, [pageNumber]);

  const goToPreviousPage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const goToNextPage = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  const handleSelectPage = (page) => {
    setPageNumber(page);
  };

  const handleChooseBook = () => {};

  const Header = useMemo(
    () => (
      <LinkHeader
        firstLink="/"
        firstTitle="쉼표"
        secondLink="/record"
        secondTitle="타임캡슐"
      />
    ),
    []
  );

  return (
    <Background>
      {Header}
      <div>등록하기</div>
      <BookListContainer>
        {posts.map((post) => (
          <BookFrame
            key={post._id}
            type="button"
            onClick={handleChooseBook.bind(this, post)}
          >
            <Image src={post.imageUrl} alt={posts.bookTitle} />
            <BookTitle>{post.bookTitle}</BookTitle>
          </BookFrame>
        ))}
      </BookListContainer>

      <footer>
        <ActiveForm>
          <PageButton
            onClick={goToPreviousPage}
            disabled={pageNumber === 0}
            title="&lt;"
          />
          {pages.map((pageIndex) => (
            <PageButton
              key={pageIndex}
              onClick={handleSelectPage.bind(this, pageIndex)}
              title={pageIndex + 1}
              disabled={pageNumber === pageIndex}
            />
          ))}

          <PageButton
            onClick={goToNextPage}
            disabled={pageNumber === numberOfPages - 1}
            title="&gt;"
          />
        </ActiveForm>
      </footer>
    </Background>
  );
}

const Background = styled.div`
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BookListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 320px);
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
`;

const ActiveForm = styled.div`
  display: flex;
  justify-content: center;
`;

export default BookList;

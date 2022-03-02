import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";

import noImage from "../../assets/noImage.png";
import LinkHeader from "../../common/compnents/LinkHeader";
import ModalBackground from "../../common/compnents/ModalBackground";
import PageButton from "../../common/compnents/PageButton";
import { createBook, getBookList } from "../../service/book";
import FindBook from "./FindBooks";

function BookList() {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const [book, setBook] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [isFind, setIsFind] = useState(false);

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

  const handleOnModal = () => {
    setIsFind(false);
    setBook([]);
    setIsShow(true);
  };

  const handleChooseBook = async () => {
    await createBook(book[0]);
    setIsShow(false);
  };

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
      <ModalButton type="button" onClick={handleOnModal}>
        등록하기
      </ModalButton>
      <ModalBackground
        onClose={() => setIsShow(false)}
        onClick={handleChooseBook}
        show={isShow}
        title="등록하기"
        setBook={setBook}
      >
        <FindBook setBook={setBook} setIsFind={setIsFind} />
        <ImageFrame>
          {isFind && (
            <ModalBookImage
              src={book[0].thumbnail ? book[0].thumbnail : noImage}
              alt={book[0].title}
            />
          )}
        </ImageFrame>
        <TextFrame>
          {isFind && (
            <div>
              <div />
              <TextTitle>{book[0].title}</TextTitle>
              <TextAuthor>저자: {book[0].authors}</TextAuthor>
              <TextContent>{book[0].contents}</TextContent>
            </div>
          )}
        </TextFrame>
      </ModalBackground>
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

const ModalButton = styled.button`
  font-size: 25px;
  margin: 10px;
  border: none;
  background: none;
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

const ImageFrame = styled.div`
  width: 50%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextFrame = styled.div`
  width: 50%;
  height: 400px;
`;

const TextTitle = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 700;
`;

const TextAuthor = styled.div`
  font-size: 15px;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 700;
  color: #da6d58;
  margin: 20px 0 10px 0;
  width: 90%;
`;

const TextContent = styled.div`
  font-size: 15px;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 700;
  width: 95%;
  border-top: 1px solid black;
  padding-top: 10px;
`;

const ModalBookImage = styled.img`
  width: 45%;
`;

export default BookList;

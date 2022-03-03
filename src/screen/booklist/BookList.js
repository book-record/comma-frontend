import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";

import noImage from "../../assets/noImage.png";
import LinkHeader from "../../common/compnents/LinkHeader";
import ModalBackground from "../../common/compnents/ModalBackground";
import PageNation from "../../common/compnents/PageNation";
import { createBook, getBookList } from "../../service/book";
import FindBook from "./components/FindBooks";

function BookList() {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const [book, setBook] = useState();
  const [shouldIsShow, setShouldIsShow] = useState(false);
  const [isChoice, setIsChoice] = useState(false);
  const [isError, setIsError] = useState(false);

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

  const handleOnModal = () => {
    setBook();
    setIsChoice(false);
    setShouldIsShow(true);
    setIsError(false);
  };

  const handleChooseBook = async () => {
    if (!book[0].thumbnail) {
      book[0].thumbnail = noImage;
    }

    if (!book[0].contents) {
      book[0].contents = "줄거리가 존재하지 않습니다";
    }
    const result = await createBook(book[0]);

    if (result === "ok") {
      setShouldIsShow(false);
      return;
    }
    setIsError(true);
  };

  const handleCloseModal = () => {
    setShouldIsShow(false);
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
      <OnModalButton type="button" onClick={handleOnModal}>
        등록하기
      </OnModalButton>
      <ModalBackground
        onClose={handleCloseModal}
        onClick={handleChooseBook}
        title="등록하기"
        show={shouldIsShow}
        setBook={setBook}
      >
        <FindBook
          setBook={setBook}
          setIsChoice={setIsChoice}
          setIsError={setIsError}
        />
        <ImageFrame>
          {isChoice && (
            <ModalBookImage
              src={book[0].thumbnail ? book[0].thumbnail : noImage}
              alt={book[0].title}
            />
          )}
        </ImageFrame>
        <TextFrame>
          {isChoice && (
            <div>
              <div />
              <TextTitle>{book[0].title}</TextTitle>
              <TextAuthor>저자: {book[0].authors}</TextAuthor>
              <TextContent>{book[0].contents}</TextContent>
            </div>
          )}
          {isError && (
            <ErrorMessage>
              이미 존재하는 책입니다 다른 책을 입력해주세요
            </ErrorMessage>
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
        <PageNation
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          numberOfPages={numberOfPages}
        />
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
  grid-template-columns: repeat(4, 320px);
  grid-template-rows: repeat(2, 260px);
  gap: 20px;
  justify-content: center;
`;

const OnModalButton = styled.button`
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
  font-size: 12px;
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 25px;
  margin-top: 15px;
`;

export default BookList;

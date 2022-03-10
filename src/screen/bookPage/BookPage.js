import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { createBook, getBookList } from "../../api/book";
import noImage from "../../assets/noImage.png";
import BookList from "../../common/compnents/BookList";
import FindBook from "../../common/compnents/FindBook";
import LinkHeader from "../../common/compnents/LinkHeader";
import ModalBackground from "../../common/compnents/ModalBackground";
import PageNation from "../../common/compnents/PageNation";

function BookPages() {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const [book, setBook] = useState([]);
  const [shouldIsShow, setShouldIsShow] = useState(false);
  const [isChoice, setIsChoice] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const id = useSelector((state) => state.user.id);
  const address = `/reportList/${id}`;
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
  }, [pageNumber, shouldIsShow]);

  const handleOnModal = () => {
    setBook([]);
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

  const handlechooseBook = (e) => {
    navigate(`/book/${e.currentTarget.id}`);
  };

  const Header = useMemo(
    () => <LinkHeader link={address} title="타임캡슐" />,
    [address]
  );

  return (
    <Background>
      {Header}
      <OnModalButton type="button" onClick={handleOnModal}>
        등록하기
      </OnModalButton>
      <ModalBackground
        show={shouldIsShow}
        onClose={handleCloseModal}
        onClick={handleChooseBook}
        title="등록하기"
      >
        <FindBook
          setBook={setBook}
          setIsChoice={setIsChoice}
          setIsError={setIsError}
        />
        <ImageFrame>
          {isChoice && (
            <img
              src={book[0].thumbnail ? book[0].thumbnail : noImage}
              alt={book[0].title}
            />
          )}
        </ImageFrame>
        <TextFrame>
          {isChoice && (
            <>
              <div />
              <TextTitle>{book[0].title}</TextTitle>
              <TextAuthor>저자: {book[0].authors}</TextAuthor>
              <TextContent>{book[0].contents}</TextContent>
            </>
          )}
          {isError && (
            <ErrorMessage>
              이미 존재하는 책입니다 다른 책을 입력해주세요
            </ErrorMessage>
          )}
        </TextFrame>
      </ModalBackground>
      <BookList posts={posts} onClick={handlechooseBook} />
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

const OnModalButton = styled.button`
  font-family: "Nanum Gothic", sans-serif;
  font-size: 20px;
  margin: 10px 20px;
  border: none;
  background: none;
`;

const ImageFrame = styled.div`
  width: 50%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 45%;
  }
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 25px;
  margin-top: 15px;
`;

export default BookPages;

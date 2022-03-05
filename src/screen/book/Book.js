import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import ActiveButton from "../../common/compnents/ActiveButton";
import LinkHeader from "../../common/compnents/LinkHeader";
import ModalBackground from "../../common/compnents/ModalBackground";
import useIsMount from "../../common/hook/useHook";
import { getBook } from "../../service/book";
import { getReview } from "../../service/review";
import BestReview from "./components/BestReview";
import Review from "./components/Review";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [bestReview, setBestReview] = useState();
  const [isRecive, setIsRecive] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [shouldIsShow, setShouldIsShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const userId = useSelector((state) => state.login.id);

  const isComponentMounted = useIsMount();
  useEffect(() => {
    const callBook = async () => {
      try {
        const data = await getBook(id);
        data.reviewerHistory.sort((a, b) => b.likes.length - a.likes.length);
        if (isComponentMounted.current) {
          setBestReview(data.reviewerHistory.shift());
          setBook(data);
          setIsRecive(true);
          setIsClick(false);
        }
      } catch (error) {
        throw new Error("책을 불러오지 못했습니다");
      }
    };

    callBook();
  }, [id, isComponentMounted, isClick]);

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

  const handlePushGood = async (e) => {
    if (bestReview._id === e.target.id) {
      if (bestReview.likes.includes(userId)) {
        await getReview(e.target.id, userId, false);
      } else {
        await getReview(e.target.id, userId, true);
      }

      setIsClick(true);
      return;
    }

    book.reviewerHistory.map(async (creator) => {
      if (creator._id === e.target.id) {
        if (creator.likes.includes(userId)) {
          await getReview(creator._id, userId, false);
        } else {
          await getReview(creator._id, userId, true);
        }
      }
      setIsClick(true);
    });
  };

  const handleOnModal = () => {
    setShouldIsShow(true);

    if (bestReview.id === userId) {
      return setIsError(true);
    }

    return book.reviewerHistory.map((creator) =>
      creator.id === userId ? setIsError(true) : setIsError(false)
    );
  };

  const handleCloseModal = () => {
    setShouldIsShow(false);
    setIsError(false);
  };

  return (
    <>
      {Header}
      <Content>
        <ImageFrame>
          <img src={book.imageUrl} alt={book.bookTitle} />
          {isRecive && bestReview && (
            <BestReview
              review={bestReview}
              userId={userId}
              onClick={handlePushGood}
            />
          )}
        </ImageFrame>
        <TextFrame>
          <TextTitle>{book.bookTitle}</TextTitle>
          <TextAuthor>저자: {book.author}</TextAuthor>
          <TextContent>{book.introduction}</TextContent>
          {isRecive && (
            <>
              <TopicTitle />
              <ScrollContainer>
                <Review book={book} userId={userId} onClick={handlePushGood} />
              </ScrollContainer>
            </>
          )}
        </TextFrame>
      </Content>
      <ButtonContainer>
        <ActiveButton
          onClick={handleOnModal}
          disabled={false}
          title="등록하기"
        />
      </ButtonContainer>
      <ModalBackground
        onClose={handleCloseModal}
        title="등록하기"
        show={shouldIsShow}
      >
        {isError && <div>이미 등록된 유저입니다</div>}
        {!isError && <div>모달입니다</div>}
      </ModalBackground>
    </>
  );
}

const Content = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  width: 90%;
  height: 100%;
  margin: 50px 0;
`;

const ImageFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: center;
  img {
    width: 180px;
  }
  div {
    text-align: center;
  }
  p {
    font-size: 20px;
  }
`;

const TextFrame = styled.div`
  width: 50%;
  height: 400px;
`;

const TextTitle = styled.div`
  font-size: 20px;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 700;
`;

const TopicTitle = styled.div`
  display: flex;
  border-top: 1px solid black;
  margin: 15px 0;
  padding-top: 12px;
  justify-content: space-between;
  width: 95%;
`;

const TextAuthor = styled.div`
  font-size: 15px;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 700;
  color: #da6d58;
  margin: 20px 0 10px 0;
  width: 90%;
`;

const ScrollContainer = styled.div`
  height: 280px;
  overflow-y: scroll;
`;

const TextContent = styled.div`
  font-size: 15px;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 700;
  width: 95%;
  border-top: 1px solid black;
  padding-top: 10px;
`;

const ButtonContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

export default Book;

import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import ActiveButton from "../../common/compnents/ActiveButton";
import LinkHeader from "../../common/compnents/LinkHeader";
import ModalBackground from "../../common/compnents/ModalBackground";
import useIsMount from "../../common/hook/useHook";
import { createReview, getBook } from "../../service/book";
import { getReview } from "../../service/review";
import { recordSound } from "../../store/recordSlice";
import Audio from "./components/Audio";
import BestReview from "./components/BestReview";
import Review from "./components/Review";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [bestReview, setBestReview] = useState();
  const [isRecive, setIsRecive] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [shouldIsShow, setShouldIsShow] = useState(false);
  const [isReviewer, setIsReviewer] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const formData = useSelector((state) => state.record.formData);

  const isComponentMounted = useIsMount();
  useEffect(() => {
    const callBook = async () => {
      try {
        const data = await getBook(id);
        data.reviewHistory.sort((a, b) => b.likes.length - a.likes.length);
        if (isComponentMounted.current) {
          setBestReview(data.reviewHistory.shift());
          setBook(data);
          setIsRecive(true);
          setIsClick(false);
        }
      } catch (error) {
        throw new Error("책을 불러오지 못했습니다");
      }
    };

    callBook();
  }, [id, isComponentMounted, isClick, shouldIsShow]);

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
      if (bestReview.likes.includes(user.id)) {
        await getReview(e.target.id, user.id, false);
      } else {
        await getReview(e.target.id, user.id, true);
      }

      setIsClick(true);
      return;
    }

    book.reviewHistory.map(async (creator) => {
      if (creator._id === e.target.id) {
        if (creator.likes.includes(user.id)) {
          await getReview(creator._id, user.id, false);
        } else {
          await getReview(creator._id, user.id, true);
        }
      }
      setIsClick(true);
    });
  };

  // eslint-disable-next-line consistent-return
  const handleOnModal = () => {
    setShouldIsShow(true);
    dispatch(recordSound({ content: null, formData: null }));
    if (bestReview) {
      if (bestReview.id === user.id) {
        return setIsReviewer(true);
      }

      return book.reviewHistory.map((creator) =>
        creator.id === user.id ? setIsReviewer(true) : setIsReviewer(false)
      );
    }
  };

  const handleCloseModal = () => {
    setShouldIsShow(false);
    setIsReviewer(false);
  };

  const handleSubmitReview = async () => {
    await createReview(id, user.id, formData);
    setShouldIsShow(false);
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
              userId={user.id}
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
                <Review book={book} userId={user.id} onClick={handlePushGood} />
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
        title="등록하기"
        onClick={handleSubmitReview}
        onClose={handleCloseModal}
        show={shouldIsShow}
      >
        <RecordWrapper>
          {isReviewer && <ErrorMessage>이미 등록된 유저입니다</ErrorMessage>}
          {!isReviewer && (
            <RecordContent>
              <h2>20초 이내로 제한 됩니다</h2>
              <h3>사용자는 책 하나당 하나의 한줄평만 등록이 가능합니다</h3>
              <h3>녹음 =&gt; 멈추기 =&gt; 저장 순으로 진행해주세요</h3>
              <Audio />
            </RecordContent>
          )}
        </RecordWrapper>
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

const RecordWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const RecordContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

const ButtonContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

const ErrorMessage = styled.div`
  color: black;
  font-size: 30px;
  margin-top: 15px;
  font-weight: 400;
`;

export default Book;

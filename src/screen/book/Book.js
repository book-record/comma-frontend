import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { createReview, getBook } from "../../api/book";
import { getReview } from "../../api/review";
import ActiveButton from "../../common/compnents/ActiveButton";
import LinkHeader from "../../common/compnents/LinkHeader";
import ModalBackground from "../../common/compnents/ModalBackground";
import useIsMount from "../../common/hook/useHook";
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
  const [isOnView, setIsOnView] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const formData = useSelector((state) => state.record.formData);
  const address = `/reportList/${user.id}`;

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
          setIsOnView(true);
        }
      } catch (error) {
        navigate("*", { replace: true });
      }
    };

    callBook();
  }, [id, isComponentMounted, isClick, shouldIsShow, navigate]);

  const Header = useMemo(
    () => <LinkHeader link={address} title="타임캡슐" />,
    [address]
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
      {isOnView && (
        <Content>
          <Container>
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
              <TextAuthor>저자 : {book.author}</TextAuthor>
              <TextContent>{book.introduction}</TextContent>
              {isRecive && (
                <>
                  <TopicTitle />
                  <ScrollContainer>
                    <Review
                      book={book}
                      userId={user.id}
                      onClick={handlePushGood}
                    />
                  </ScrollContainer>
                </>
              )}
              <ButtonContainer>
                <ActiveButton
                  onClick={handleOnModal}
                  disabled={false}
                  title="등록하기"
                />
              </ButtonContainer>
            </TextFrame>
          </Container>
        </Content>
      )}
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
  justify-content: center;
  height: 90vh;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 90%;
  height: 90%;
  border-radius: 10px;
`;

const ImageFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 180px;
  }
`;

const TextFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 83%;
  margin: 30px 20px 0px 20px;
  padding: 10px;
  background: #fbe9e7;
`;

const TopicTitle = styled.div`
  display: flex;
  border-top: 1px solid black;
  justify-content: space-between;
`;

const TextTitle = styled.div`
  font-size: 20px;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 700;
`;

const TextAuthor = styled.div`
  font-size: 15px;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 700;
  color: #da6d58;
  margin: 10px 0 10px 0;
  width: 90%;
`;

const TextContent = styled.div`
  font-size: 15px;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 700;
  border-top: 1px solid black;
  padding: 10px;
`;

const ScrollContainer = styled.div`
  height: 230px;
  overflow-y: scroll;
  margin-top: 10px;
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

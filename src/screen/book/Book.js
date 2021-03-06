import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { createReview, getBook } from "../../api/book";
import { updateReview } from "../../api/review";
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
  const { formData, isValue } = useSelector((state) => state.record);
  const address = `/reportList/${user.id}`;

  const componentMounted = useIsMount();

  useEffect(() => {
    const callBook = async () => {
      try {
        const data = await getBook(id);
        data.reviewHistory.sort((a, b) => b.likes.length - a.likes.length);
        if (componentMounted.current) {
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
  }, [componentMounted, id, isClick, navigate, shouldIsShow]);

  const Header = useMemo(
    () => <LinkHeader link={address} title="????????????" />,
    [address]
  );

  const handlePushGood = async (e) => {
    try {
      if (bestReview._id === e.target.id) {
        if (bestReview.likes.includes(user.id)) {
          await updateReview(e.target.id, user.id, false);
        } else {
          await updateReview(e.target.id, user.id, true);
        }
        setIsClick(true);
        return;
      }

      book.reviewHistory.map(async (creator) => {
        if (creator._id === e.target.id) {
          if (creator.likes.includes(user.id)) {
            await updateReview(creator._id, user.id, false);
          } else {
            await updateReview(creator._id, user.id, true);
          }
        }
        setIsClick(true);
      });
    } catch (error) {
      navigate("*", { replace: true });
    }
  };

  // eslint-disable-next-line consistent-return
  const handleOnModal = () => {
    setShouldIsShow(true);
    dispatch(recordSound({ content: null, formData: null, value: false }));
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
    try {
      if (isValue) {
        await createReview(id, user.id, formData);
        setShouldIsShow(false);
      }
    } catch (error) {
      navigate("*", { replace: true });
    }
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
              {!bestReview && (
                <BestReviewContainer>
                  <h2>????????? ???????????? ????????????</h2>
                </BestReviewContainer>
              )}
            </ImageFrame>
            <TextFrame>
              <TextTitle>{book.bookTitle}</TextTitle>
              <TextAuthor>?????? : {book.author}</TextAuthor>
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
                  title="????????????"
                />
              </ButtonContainer>
            </TextFrame>
          </Container>
        </Content>
      )}
      <ModalBackground
        title="????????????"
        onClick={handleSubmitReview}
        onClose={handleCloseModal}
        show={shouldIsShow}
      >
        <RecordWrapper>
          {isReviewer && <ErrorMessage>?????? ????????? ???????????????</ErrorMessage>}
          {!isReviewer && (
            <RecordContent>
              <h2>20??? ????????? ?????? ?????????</h2>
              <h3>???????????? ??? ????????? ????????? ???????????? ????????? ???????????????</h3>
              <h3>?????? =&gt; ????????? =&gt; ?????? ????????? ??????????????????</h3>
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
  align-items: center;
  height: 90vh;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  align-items: stretch;
`;

const ImageFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #eceff1;
  img {
    margin-top: 15px;
    width: 180px;
  }
`;

const BestReviewContainer = styled.div`
  display: flex;
  padding: 10px;
  margin-top: 20px;
  background: #9ea7aa;
`;

const TextFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40%;
  padding: 20px 20px 0 20px;
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
  width: 90%;
  margin: 10px 0 10px 0;
  color: #da6d58;
  font-size: 15px;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 700;
`;

const TextContent = styled.div`
  border-top: 1px solid black;
  padding: 15px 0 15px 0;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 700;
  font-size: 15px;
`;

const ScrollContainer = styled.div`
  height: 200px;
  margin-bottom: 5px;
  overflow-y: scroll;
  margin-top: 10px;
  background: #fff;
`;

const RecordWrapper = styled.div`
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
  margin-bottom: 5px;
`;

const ErrorMessage = styled.div`
  margin-top: 15px;
  color: black;
  font-size: 30px;
  font-weight: 400;
`;

export default Book;

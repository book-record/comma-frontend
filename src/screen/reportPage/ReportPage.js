/* eslint-disable no-console */
import dayjs from "dayjs";
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getReportList, createRport } from "../../api/report";
import noImage from "../../assets/noImage.png";
import BookList from "../../common/compnents/BookList";
import FindBook from "../../common/compnents/FindBook";
import LinkHeader from "../../common/compnents/LinkHeader";
import ModalBackground from "../../common/compnents/ModalBackground";
import OnModalButton from "../../common/compnents/OnModalButton";
import PageNation from "../../common/compnents/PageNation";
import { LIMIT } from "../../common/constants/MESSAGE";
import Text from "./components/Text";
import Title from "./components/Title";

function ReportPages() {
  const { userId } = useParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const [book, setBook] = useState([]);
  const [isChoice, setIsChoice] = useState(false);
  const [shouldIsShow, setShouldIsShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportText, setRerpotText] = useState("");

  const limitText = LIMIT.TEXT;
  const limitTitle = LIMIT.TEXT;
  const textValue = limitText - reportText.length;
  const navigate = useNavigate();

  useEffect(() => {
    const callReportList = async () => {
      try {
        const { totalPage, reportList } = await getReportList(
          pageNumber,
          userId
        );

        setPosts(reportList);
        setNumberOfPages(totalPage);
      } catch (error) {
        navigate("*", { replace: true });
      }
    };

    callReportList();
  }, [userId, pageNumber, shouldIsShow, navigate]);

  const handleOnModal = () => {
    setBook([]);
    setIsChoice(false);
    setShouldIsShow(true);
    setIsError(false);
    setReportTitle("");
    setRerpotText("");
  };

  const handleSaveReport = async () => {
    if (!reportTitle || !reportText) {
      return;
    }

    const list = {
      id: userId,
      bookTitle: book[0].title,
      imageUrl: book[0].thumbnail,
      title:
        reportTitle.trim().length > limitTitle
          ? reportTitle.slice(0, limitTitle)
          : reportTitle,
      text:
        reportText.length > limitText
          ? reportText.slice(0, limitText)
          : reportText,
      startDate: new Date().toISOString(),
      finishDate: dayjs(new Date()).add(1, "y").toISOString(),
    };

    await createRport(list);
    setShouldIsShow(false);
  };

  const handleCloseModal = () => {
    setShouldIsShow(false);
  };

  const handleMoveReport = (e) => {
    if (e.currentTarget.dataset.day === "D-day") {
      return navigate(`/report/${e.currentTarget.id}`);
    }
    setIsError(true);
    return setShouldIsShow(true);
  };

  const handleWriteReportTitle = (e) => {
    setReportTitle(e.target.value);
  };

  const handleWriteReportText = (e) => {
    setRerpotText(e.target.value);
  };

  const Header = useMemo(
    () => <LinkHeader link="/bookList" title="한줄평" />,
    []
  );

  return (
    <Background>
      {Header}
      <OnModalButton onClick={handleOnModal} text="보내기" />
      {isError && (
        <ModalBackground show={shouldIsShow} onClose={handleCloseModal}>
          <RecordWrapper>
            <div>D-day가 되지 않았습니다 기다려주세요</div>
          </RecordWrapper>
        </ModalBackground>
      )}
      {!isError && (
        <ModalBackground
          show={shouldIsShow}
          onClose={handleCloseModal}
          onClick={handleSaveReport}
          title="1년 후"
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
                <Title title={reportTitle} onChange={handleWriteReportTitle} />
                <Text text={reportText} onChange={handleWriteReportText} />
                <div>
                  남은 글자 수 :
                  <input type="text" readOnly value={textValue} />
                </div>
              </>
            )}
          </TextFrame>
        </ModalBackground>
      )}
      <BookList posts={posts} onClick={handleMoveReport} />
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const ImageFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 400px;
  img {
    width: 45%;
  }
`;

const TextFrame = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 50%;
  height: 450px;
  div {
    margin-top: 20px;
    input {
      width: 60px;
      text-align: center;
      border: none;
    }
  }
`;

const RecordWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  div {
    margin-top: 15px;
    color: black;
    font-weight: 400;
    font-size: 30px;
  }
`;

export default ReportPages;

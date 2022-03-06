/* eslint-disable no-console */
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import noImage from "../../assets/noImage.png";
import BookList from "../../common/compnents/BookList";
import FindBook from "../../common/compnents/FindBook";
import LinkHeader from "../../common/compnents/LinkHeader";
import ModalBackground from "../../common/compnents/ModalBackground";
import PageNation from "../../common/compnents/PageNation";
import { getReportList } from "../../service/report";

function ReportPages() {
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const [book, setBook] = useState([]);
  const [isChoice, setIsChoice] = useState(false);
  const [shouldIsShow, setShouldIsShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [reportTitle, setReportTitle] = useState();
  const [reportText, setRerpotText] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const callReportList = async () => {
      try {
        const { totalPage, reportList } = await getReportList(pageNumber, id);
        setPosts(reportList);
        setNumberOfPages(totalPage);
      } catch (error) {
        throw new Error("독후감을 불러오지 못했습니다");
      }
    };

    callReportList();
  }, [id, pageNumber, shouldIsShow]);

  const handleOnModal = () => {
    setBook([]);
    setIsChoice(false);
    setShouldIsShow(true);
    setIsError(false);
  };

  const handleSaveReport = async () => {
    console.log(reportTitle);
    console.log(reportText);
  };

  const handleCloseModal = () => {
    setShouldIsShow(false);
  };

  const handleChooseReport = (e) => {
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
    () => (
      <LinkHeader
        firstLink="/"
        firstTitle="쉼표"
        secondLink="/bookList"
        secondTitle="한줄평"
      />
    ),
    []
  );

  return (
    <Background>
      {Header}
      <OnModalButton type="button" onClick={handleOnModal}>
        보내기
      </OnModalButton>
      <ModalBackground
        show={shouldIsShow}
        onClose={handleCloseModal}
        onClick={handleSaveReport}
        title="1년 후"
      >
        {isError && (
          <RecordWrapper>
            <div>D-day가 되지 않았습니다 기다려주세요</div>
          </RecordWrapper>
        )}
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
              <input
                placeholder="제목을 입력하세요"
                type="text"
                onChange={handleWriteReportTitle}
              />
              <input
                placeholder="본문을 입력하세요"
                type="text"
                onChange={handleWriteReportText}
              />
            </>
          )}
        </TextFrame>
      </ModalBackground>
      <BookList posts={posts} onClick={handleChooseReport} />
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
  font-size: 25px;
  margin: 10px;
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

const RecordWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  div {
    color: black;
    font-size: 30px;
    margin-top: 15px;
    font-weight: 400;
  }
`;

export default ReportPages;

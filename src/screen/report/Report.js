import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import LinkHeader from "../../common/compnents/LinkHeader";
import { getReport } from "../../service/report";

function Report() {
  const { id } = useParams();
  const [report, setReport] = useState([]);
  const [isOnDate, setIsOnDate] = useState(false);

  useEffect(() => {
    const callReport = async () => {
      try {
        const reportValue = await getReport(id);
        setReport(reportValue);
        setIsOnDate(true);
      } catch (error) {
        throw new Error("독후감을 불러오지 못했습니다");
      }
    };

    callReport();
  }, [id]);

  const Header = useMemo(
    () => <LinkHeader link="/bookList" title="한줄평" />,
    []
  );

  return (
    <>
      {Header}
      <BookBackground>
        <Content>
          <ImageFrame>
            {isOnDate && <p>{report.startDate.slice(0, 10)}일</p>}
            <img src={report.imageUrl} alt={report.bookTitle} />
            <p>{report.bookTitle}</p>
          </ImageFrame>
          <TextFrame>
            <div>{report.title}</div>
            <div>{report.text}</div>
          </TextFrame>
        </Content>
      </BookBackground>
    </>
  );
}

const BookBackground = styled.div`
  margin-top: 100px;
  background-image: url("/bookCover.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 75vh;
`;

const Content = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const ImageFrame = styled.div`
  display: flex;
  width: 27%;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-right: 60px;
  img {
    width: 200px;
  }
`;

const TextFrame = styled.div`
  width: 22%;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin-top: 40px;
    font-size: 14px;
  }
`;

export default Report;
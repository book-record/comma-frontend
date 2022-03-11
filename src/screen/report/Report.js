import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getReport } from "../../api/report";
import LinkHeader from "../../common/compnents/LinkHeader";

function Report() {
  const { id } = useParams();
  const [report, setReport] = useState([]);
  const [isOnDate, setIsOnDate] = useState(false);
  const navigate = useNavigate();
  const [isOnView, setIsOnView] = useState(false);

  useEffect(() => {
    const callReport = async () => {
      try {
        const reportValue = await getReport(id);
        if (reportValue === "reportError") {
          navigate("*", { replace: true });
          return;
        }
        setReport(reportValue);
        setIsOnDate(true);
        setIsOnView(true);
      } catch (error) {
        navigate("*", { replace: true });
      }
    };

    callReport();
  }, [id, navigate]);

  const Header = useMemo(
    () => <LinkHeader link="/bookList" title="한줄평" />,
    []
  );

  return (
    <>
      {Header}
      {isOnView && (
        <BookBackground>
          <Content>
            <ImageContainer>
              <ImageFrame>
                {isOnDate && <p>{report.startDate.slice(0, 10)}일</p>}
                <img src={report.imageUrl} alt={report.bookTitle} />
                <p>{report.bookTitle}</p>
              </ImageFrame>
            </ImageContainer>
            <TextContainer>
              <TextFrame>
                <h2>{report.title}</h2>
                <p>{report.text}</p>
              </TextFrame>
            </TextContainer>
          </Content>
        </BookBackground>
      )}
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
  font-family: "Nanum Gothic", sans-serif;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  text-align: center;
  width: 600px;
  margin-left: 423px;
`;

const ImageFrame = styled.div`
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  img {
    width: 200px;
  }
  p {
    width: 230px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  width: 400px;
  margin-top: 20px;
  margin-right: 380px;
  h2 {
    text-align: center;
  }
`;

const TextFrame = styled.div`
  width: 100%;
  flex-direction: column;
  p {
    margin-top: 30px;
    font-size: 15px;
  }
`;

export default Report;

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
    <Background>
      {Header}
      {isOnView && (
        <BookBackground>
          <>
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
          </>
        </BookBackground>
      )}
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

const BookBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-image: url("/bookCover.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  min-width: 1000px;
  height: 75vh;
  margin-top: 50px;
  font-family: "Nanum Gothic", sans-serif;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: center;
  height: 80%;
  width: 32%;
  text-align: center;
  min-width: 300px;
`;

const ImageFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  img {
    width: 200px;
  }
  p {
    width: 230px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 80%;
  width: 27%;
  min-width: 300px;
  margin-top: 20px;
  h2 {
    text-align: center;
  }
`;

const TextFrame = styled.div`
  flex-direction: column;
  p {
    width: 90%;
    margin-top: 30px;
    font-size: 14px;
  }
`;

export default Report;

import React from "react";
import styled from "styled-components";

function InstructionBook() {
  return (
    <Container>
      <div>
        <h1>한줄평</h1>
        <p>
          1. 사용자는 등록하기를 클릭 후, 책의 제목을 통해 책을 등록할 수
          있습니다.
        </p>
        <p>2. 사용자는 한 책 당, 하나의 음성파일을 올릴 수 있습니다.</p>
        <p>3. 좋아요를 눌러서 감명 깊은 한줄평을 선택해주세요.</p>
      </div>
      <div>
        <h1>타임캡슐</h1>
        <p>1. 사용자는 보내기를 통해 책에 대한 감상평을 기록할 수 있습니다.</p>
        <p>
          2. 1분 후를 클릭시, 가입 된 이메일을 통해 독후감 링크를 받아 볼 수
          있습니다.
        </p>
      </div>
    </Container>
  );
}

export default InstructionBook;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  transform: translateY(100px);
  h1 {
    text-align: center;
  }
`;

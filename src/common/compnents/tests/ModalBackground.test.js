import React from "react";

import { fireEvent, cleanup, render, screen } from "../../utils/test-utils";
import ModalBackground from "../ModalBackground";

afterEach(cleanup);

describe("<ModalBackground>", () => {
  const onClick = jest.fn();
  const onClose = jest.fn();

  const { getByText } = render(
    <ModalBackground
      show={true}
      onClose={onClose}
      onClick={onClick}
      title="보내기"
    >
      <div>test</div>
    </ModalBackground>
  );

  it("ModalBackground props로 넘어온 값이 잘 넘어왔는지 확인", () => {
    fireEvent.click(screen.getByText("닫기"));

    expect(getByText("test")).toBeTruthy();
    expect(screen.findByText("닫기"));
  });
});

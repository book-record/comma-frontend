import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { render, screen } from "../../../common/utils/test-utils";
import Main from "../Main";

describe("<Main />", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );

  it("메인페이지 렌더링 시 텍스트 확인", () => {
    expect(screen.getByText("한줄평"));
    expect(screen.getByText("타임캡슐"));
  });
});

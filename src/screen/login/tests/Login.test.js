import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { render, screen } from "../../../common/utils/test-utils";
import Login from "../Login";

describe("<Login />", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );

  it("로그인페이지 렌더링 시 텍스트 확인", () => {
    expect(screen.getByText("쉼 표"));
  });
});

import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "../NotFound";

describe("<NotFound />", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );

  it("에러페이지 렌더링 시 텍스트 확인", () => {
    expect(screen.getByText("404"));
    expect(screen.getByText("This page is missing"));
  });
});

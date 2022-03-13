import { render, screen } from "@testing-library/react";
import React from "react";

import NotFound from "../NotFound";

describe("<NotFound />", () => {
  render(<NotFound />);

  it("에러페이지 렌더링 시 텍스트 확인", () => {
    expect(screen.getByText("404"));
    expect(screen.getByText("This is not the web page you are looking for"));
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import ActiveButton from "../ActiveButton";

describe("<ActiveButton />", () => {
  const onClick = jest.fn();
  const { getByRole } = render(
    <ActiveButton onClick={onClick} disabled={false} title="hello" />
  );

  it("ActiveButton props넘어온 값 확인 및 클릭이벤트 시 확인여부", () => {
    const button = getByRole("button");

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveProperty("disabled", false);
    expect(screen.getByText("hello"));
  });
});

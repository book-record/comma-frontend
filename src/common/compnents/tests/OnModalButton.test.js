import React from "react";

import { fireEvent, cleanup, render, screen } from "../../utils/test-utils";
import OnModalButton from "../OnModalButton";

afterEach(cleanup);

describe("<OnModalButton>", () => {
  const onClick = jest.fn();

  const { getByRole, container } = render(
    <OnModalButton onClick={onClick} text="보내다" />
  );

  it("OnModalButton props로 넘어온 값이 잘 넘어왔는지 확인", () => {
    expect(onClick).toHaveBeenCalledTimes(0);
    expect(screen.getByText("보내다"));
    expect(container).toMatchSnapshot();
  });

  it("OnModalButton 클릭시 클릭 여부 반영", () => {
    render(<OnModalButton onClick={onClick} text="보내다" />);
    const button = getByRole("button");

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

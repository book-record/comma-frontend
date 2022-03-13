/* eslint-disable react/prop-types */
import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import recordRouter from "../../store/recordSlice";
import userRouter from "../../store/userSlice";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        user: userRouter,
        record: recordRouter,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };

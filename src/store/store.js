import { configureStore } from "@reduxjs/toolkit";

import loginRouter from "./loginSlice";

const store = configureStore({
  reducer: {
    login: loginRouter,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

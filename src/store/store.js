import { configureStore } from "@reduxjs/toolkit";

import userRouter from "./userSlice";

const store = configureStore({
  reducer: {
    login: userRouter,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

import recordRouter from "./recordSlice";
import userRouter from "./userSlice";

const store = configureStore({
  reducer: {
    user: userRouter,
    record: recordRouter,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

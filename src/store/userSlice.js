import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: null,
  email: null,
  nickname: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const { userId, email, nickname } = action.payload;
      state.id = userId;
      state.email = email;
      state.nickname = nickname;
    },
  },
});

export const { signIn } = userSlice.actions;
export default userSlice.reducer;

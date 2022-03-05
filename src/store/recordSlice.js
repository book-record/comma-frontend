import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  content: null,
  formData: null,
};

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    recordSound: (state, action) => {
      const { content, data } = action.payload;
      state.content = content;
      state.formData = data;
    },
  },
});

export const { recordSound } = recordSlice.actions;
export default recordSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  content: null,
  formData: null,
  isValue: false,
};

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    recordSound: (state, action) => {
      const { content, data, value } = action.payload;
      state.content = content;
      state.formData = data;
      state.isValue = value;
    },
  },
});

export const { recordSound } = recordSlice.actions;
export default recordSlice.reducer;

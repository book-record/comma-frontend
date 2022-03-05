import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  content: null,
  recordFile: {},
};

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    recordSound: (state, action) => {
      const { content, recordedAudio } = action.payload;
      state.content = content;
      state.recordFile = recordedAudio;
    },
  },
});

export const { recordSound } = recordSlice.actions;
export default recordSlice.reducer;

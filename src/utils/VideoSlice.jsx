import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videoList: []
  },
  reducers: {
    addVideos: (state, action) => {
      state.videoList = [...state.videoList, ...action.payload];
    }
  }
});

export const { addVideos } = videoSlice.actions;
export default videoSlice.reducer;
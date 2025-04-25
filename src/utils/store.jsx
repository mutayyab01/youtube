import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import ChatSlice from "./ChatSlice";
import SearchSlice from "./SearchSlice";
import  videoReducer from "./VideoSlice";

const store = configureStore({
    reducer: {
      app: appSlice,
      search: SearchSlice,
      chat: ChatSlice,
      video: videoReducer, // Use the imported reducer
    },
})
export default store;
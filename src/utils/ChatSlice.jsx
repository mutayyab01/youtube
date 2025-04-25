import { createSlice } from "@reduxjs/toolkit";
import {LIVE_CHAT_OFFSET_LIMIT} from "../utils/Constants";
const chatSlice=createSlice({
    name:"chat",
    initialState:{
        messages:[],
    },
    reducers:{
        addMessage:(state,action)=>{
            state.messages.splice(LIVE_CHAT_OFFSET_LIMIT,1);
            state.messages.unshift(action.payload);
        },
    },
})
export const {addMessage} = chatSlice.actions;
export default chatSlice.reducer;

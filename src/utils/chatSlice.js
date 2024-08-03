import { createSlice } from "@reduxjs/toolkit";
import { Live_chat_count } from "./contants";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        message: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.message.splice(Live_chat_count, 1);
            state.message.unshift(action.payload);
        },
    },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;

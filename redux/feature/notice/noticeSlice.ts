import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoticeState {
  title: string;
  content: string;
}

const initialState: NoticeState = {
  title: "",
  content: "",
};

export const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNoticeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setNoticeContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { setNoticeTitle, setNoticeContent } = noticeSlice.actions;
export default noticeSlice.reducer;

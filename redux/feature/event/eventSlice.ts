import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventState {
  title: string;
  content: string;
  file: File | undefined | null;
}

const initialState: EventState = {
  title: "",
  content: "",
  file: null,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setEventContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { setEventTitle, setEventContent } = eventSlice.actions;
export default eventSlice.reducer;

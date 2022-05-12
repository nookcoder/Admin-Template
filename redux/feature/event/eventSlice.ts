import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventState {
  title: string;
  content: string;
  imageSourceUrl: string;
  uuid: string;
}

const initialState: EventState = {
  title: "",
  content: "",
  imageSourceUrl: "",
  uuid: "",
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
    setEventImageUrl: (state, action: PayloadAction<string>) => {
      state.imageSourceUrl = action.payload;
    },

    setEventUuid: (state, action: PayloadAction<string>) => {
      state.uuid = action.payload;
    },
  },
});

export const { setEventTitle, setEventContent, setEventImageUrl } =
  eventSlice.actions;
export default eventSlice.reducer;

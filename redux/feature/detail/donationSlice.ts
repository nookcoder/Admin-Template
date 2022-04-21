import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DonationState {
  title: string;
  content: string;
}

const initialState: DonationState = {
  title: "",
  content: "",
};

export const donationSlice = createSlice({
  name: "detailDonation",
  initialState,
  reducers: {
    setStoryTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setStoryContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { setStoryTitle, setStoryContent } = donationSlice.actions;
export default donationSlice.reducer;

// Define type for the slice state
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailUserState {
  displayName: string;
  birthDay: string;
}
const initialState: DetailUserState = {
  displayName: "",
  birthDay: "",
};

export const detailUserSlice = createSlice({
  name: "detailUser",
  initialState,
  reducers: {
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    setBirthDay: (state, action: PayloadAction<string>) => {
      state.birthDay = action.payload;
    },
  },
});

export const { setBirthDay, setDisplayName } = detailUserSlice.actions;
export default detailUserSlice.reducer;

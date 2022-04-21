// Define type for the slice state
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  displayName: string;
  birthDay: string;
}
const initialState: UserState = {
  displayName: "",
  birthDay: "",
};

export const userSlice = createSlice({
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

export const { setBirthDay, setDisplayName } = userSlice.actions;
export default userSlice.reducer;

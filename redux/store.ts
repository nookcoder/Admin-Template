import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/detail/userSlice";
import donationSlice from "./feature/detail/donationSlice";

export const store = configureStore({
  reducer: {
    detailUser: userSlice,
    detailDonation: donationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/detail/userSlice";
import donationSlice from "./feature/detail/donationSlice";
import noticeSlice from "./feature/notice/noticeSlice";

export const store = configureStore({
  reducer: {
    detailUser: userSlice,
    detailDonation: donationSlice,
    notice: noticeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

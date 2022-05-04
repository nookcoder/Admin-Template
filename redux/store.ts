import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/detail/userSlice";
import donationSlice from "./feature/detail/donationSlice";
import authSlice from "./feature/auth/authSlice";
import noticeSlice from "./feature/notice/noticeSlice";
import eventSlice from "./feature/event/eventSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  detailUser: userSlice,
  detailDonation: donationSlice,
  notice: noticeSlice,
  auth: authSlice,
  event: eventSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const pReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: pReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

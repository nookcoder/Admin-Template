import { configureStore } from "@reduxjs/toolkit";
import { detailUserSlice } from "./feature/detailUser/detailUserSlice";

export const store = configureStore({
  reducer: {
    detailUser: detailUserSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

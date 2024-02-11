import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    authentication: authSlice,
  },
});

export default store;

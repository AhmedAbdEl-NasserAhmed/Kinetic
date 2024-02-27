import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { programsApi } from "../services/programsApi";
import authReducers from "./authSlice/authSlice";
import { workoutApi } from "../services/workoutApi";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    authentication: authReducers,
    [programsApi.reducerPath]: programsApi.reducer,
    [workoutApi.reducerPath]: workoutApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      programsApi.middleware,
      workoutApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;

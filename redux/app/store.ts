import { configureStore } from "@reduxjs/toolkit";
import { publicApiSlice } from "../services/publicApiSlice";
import { protectedApiSlice } from "../services/protectedApiSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [publicApiSlice.reducerPath]: publicApiSlice.reducer,
    [protectedApiSlice.reducerPath]: protectedApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      publicApiSlice.middleware,
      protectedApiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

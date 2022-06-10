import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import backgroundReducer from "../features/background/backgroundSlice";
import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    background: backgroundReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

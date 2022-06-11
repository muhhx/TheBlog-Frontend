import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import backgroundReducer from "../features/background/backgroundSlice";
import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    background: backgroundReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

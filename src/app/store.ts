import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
import backgroundReducer from "../features/background/backgroundSlice";
import postsReducer from "../features/posts/postsSlice";
import panelReducer from "../features/panel/panelSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    posts: postsReducer,
    background: backgroundReducer,
    panel: panelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";

import { fetchAuth } from "./features/auth/authSlice";
import { fetchBackground } from "./features/background/backgroundSlice";
import { fetchPosts } from "./features/posts/postsSlice";

import Routing from "./Routing";
import GlobalStyle from "./global";

export default function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (auth.status === "idle") {
      dispatch(fetchAuth());
      dispatch(fetchPosts());
      dispatch(fetchBackground());
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Routing />
    </>
  );
}

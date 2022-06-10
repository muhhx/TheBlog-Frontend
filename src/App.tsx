import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import {
  fetchPending,
  fetchRejected,
  fetchFulfilled,
} from "./features/auth/authSlice";
import { fetchBackground } from "./features/background/backgroundSlice";

import Routing from "./routes/Routing";
import GlobalStyle from "./global";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

export default function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (auth.status === "idle") {
      const getUser = async () => {
        try {
          dispatch(fetchPending());
          const response = await axiosPrivate.get("/api/session");
          dispatch(fetchFulfilled(response.data.data.userName));
        } catch (error) {
          dispatch(fetchRejected());
        }
      };
      dispatch(fetchBackground());
      getUser();
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Routing />
    </>
  );
}

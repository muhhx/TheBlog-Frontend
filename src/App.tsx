import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { fetchUser } from "./features/auth/authSlice";
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
      dispatch(fetchUser());
      dispatch(fetchBackground());
    }
  }, []);

  async function getSession() {
    try {
      const response = await axiosPrivate.get("/api/session");

      console.log(response.data.message);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  return (
    <>
      <button onClick={() => getSession()}>get sess</button>
      <GlobalStyle />
      <Routing />
    </>
  );
}

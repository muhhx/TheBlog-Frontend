import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { fetchUser } from "./features/auth/authSlice";
import Routing from "./routes/Routing";
import GlobalStyle from "./global";

export default function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (auth.status === "idle") dispatch(fetchUser());
  }, []);

  return (
    <>
      <GlobalStyle />
      <Routing />
    </>
  );
}

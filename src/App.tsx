import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";

import { fetchAuth } from "./features/auth/authSlice";
import { fetchBackground } from "./features/background/backgroundSlice";

import Routing from "./Routing";
import GlobalStyle from "./global";

export default function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const panel = useSelector((state: RootState) => state.panel);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (auth.status === "idle") {
      dispatch(fetchAuth());
      dispatch(fetchBackground());
    }
  }, []);

  return (
    <>
      <GlobalStyle displayPanel={panel.display} />
      <Routing />
    </>
  );
}

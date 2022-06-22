import { useSelector } from "react-redux";
import { selectAuthState } from "../../features/auth/authSlice";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import Spinner from "../Spinner";
import * as C from "./styles";

export default function PrivateRoute() {
  const auth = useSelector(selectAuthState);
  const location = useLocation();

  return (
    <>
      {(auth.status === "pending" || auth.status === "idle") && (
        <C.Container>
          <Spinner />
        </C.Container>
      )}

      {auth.isAuth && <Outlet />}

      {!auth.isAuth && (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
}

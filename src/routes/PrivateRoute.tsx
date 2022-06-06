import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const { status, isAuth } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return status === "pending" || status === "idle" ? (
    <p>"Loading..."</p>
  ) : isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

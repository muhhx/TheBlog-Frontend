import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/authSlice";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const { status, isAuth } = useSelector(selectAuth);
  const location = useLocation();

  return status === "pending" || status === "idle" ? (
    <p>"Loading..."</p>
  ) : isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

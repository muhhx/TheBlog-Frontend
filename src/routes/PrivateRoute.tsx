import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const { status, loggedOut } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedOut) return navigate("/");
  }, [loggedOut]);

  return status === "pending" || status === "idle" ? (
    <p>"Loading..."</p>
  ) : status === "success" ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ location }} replace />
  );
}

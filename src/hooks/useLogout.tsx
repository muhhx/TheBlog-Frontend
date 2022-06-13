import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { logoutAuth } from "../features/auth/authSlice";

export default function useLogout() {
  const dispatch: AppDispatch = useDispatch();

  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");

  const logout = async () => {
    setStatus("loading");

    const { payload }: any = await dispatch(logoutAuth());

    if (!payload.success) {
      setError(payload.message);
      setStatus("failure");
    } else {
      setStatus("success");
    }
  };

  return [status, error, logout] as const;
}

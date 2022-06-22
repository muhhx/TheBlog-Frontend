import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginAuth } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");

  const login = async (email: string, password: string) => {
    setStatus("loading");
    setError("");

    const { payload }: any = await dispatch(loginAuth({ email, password }));

    if (!payload.success) {
      setError(payload.message);
      setStatus("failure");
    } else {
      setStatus("success");
      navigate("/");
    }
  };

  return [status, error, setError, login] as const;
}

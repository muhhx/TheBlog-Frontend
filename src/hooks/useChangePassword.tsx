import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { changePassword } from "../features/auth/authSlice";

export default function useChangePassword() {
  const dispatch: AppDispatch = useDispatch();

  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");

  const change = async (password: string, passwordConfirmation: string) => {
    setStatus("loading");
    setError("");

    const { payload }: any = await dispatch(
      changePassword({ password, passwordConfirmation })
    );

    if (!payload.success) {
      setError(payload.message);
      setStatus("failure");
    } else {
      setStatus("success");
    }
  };

  return [status, error, change] as const;
}

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { deleteAccount } from "../features/auth/authSlice";

export default function useDeleteAccount() {
  const dispatch: AppDispatch = useDispatch();

  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");

  const deleteAcc = async (password: string) => {
    setStatus("loading");
    setError("");

    const { payload }: any = await dispatch(deleteAccount({ password }));

    if (!payload.success) {
      setError(payload.message);
      setStatus("failure");
    } else {
      setStatus("success");
    }
  };

  return [status, error, deleteAcc] as const;
}

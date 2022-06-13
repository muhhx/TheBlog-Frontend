import { useState } from "react";
import { unfollowUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

export default function useFollow() {
  const dispatch: AppDispatch = useDispatch();

  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");

  const follow = async (id: string) => {
    setStatus("loading");

    const { payload }: any = await dispatch(unfollowUser({ id }));

    if (!payload.success) {
      setError(payload.message);
      setStatus("failure");
    } else {
      setStatus("success");
    }
  };

  return [status, error, follow] as const;
}

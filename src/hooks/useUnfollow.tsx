import { useState } from "react";
import { unfollowUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

export default function useUnfollow() {
  const dispatch: AppDispatch = useDispatch();

  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");

  const unfollow = async (id: string) => {
    setStatus("loading");

    const { payload }: any = await dispatch(unfollowUser({ id }));

    if (!payload.success) {
      setError(payload.message);
      setStatus("failure");
    } else {
      setStatus("success");
    }
  };

  return [status, error, unfollow] as const;
}

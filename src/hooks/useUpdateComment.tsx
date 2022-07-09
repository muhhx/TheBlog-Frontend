import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../features/post/postSlice";
import { AppDispatch } from "../app/store";

export default function useUpdateComment() {
  const dispatch: AppDispatch = useDispatch();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");
  const [error, setError] = useState("");

  const update = async (commentId: string, comment: string) => {
    setStatus("loading");
    setError("");

    const { payload }: any = await dispatch(
      updateComment({ commentId, comment })
    );

    if (!payload.success) {
      setError(payload.message);
      setStatus("failure");
    } else {
      setStatus("success");
    }
  };

  return [status, error, update] as const;
}

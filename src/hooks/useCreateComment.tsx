import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../features/post/postSlice";
import { AppDispatch } from "../app/store";

export default function useCreateComment() {
  const dispatch: AppDispatch = useDispatch();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");
  const [error, setError] = useState("");

  const create = async (data: { comment: string; postId: string }) => {
    setStatus("loading");
    setError("");

    const { payload }: any = await dispatch(createComment(data));

    if (!payload.success) {
      setError(payload.message);
      setStatus("failure");
    } else {
      setStatus("success");
    }
  };

  return [status, error, create] as const;
}

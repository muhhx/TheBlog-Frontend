import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../features/post/postSlice";
import { AppDispatch } from "../app/store";

export default function useDeleteComment() {
  const dispatch: AppDispatch = useDispatch();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");
  const [error, setError] = useState("");

  const deleteCommentData = async (commentId: string) => {
    setStatus("loading");
    setError("");

    const { payload }: any = await dispatch(deleteComment({ commentId }));

    if (!payload.success) {
      setError(payload.message);
      setStatus("failure");
    } else {
      setStatus("success");
    }
  };

  return [status, error, deleteCommentData] as const;
}

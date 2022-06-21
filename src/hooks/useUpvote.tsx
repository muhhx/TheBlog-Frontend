import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { selectPost, upvotePost, unvotePost } from "../features/post/postSlice";

export default function useUpvote() {
  const dispatch: AppDispatch = useDispatch();
  const { isLiked } = useSelector(selectPost);

  const [status, setStatus] = useState<
    "idle" | "loading" | "failure" | "success"
  >("idle");
  const [error, setError] = useState("");

  const handleUpvote = async (postId: string) => {
    setStatus("loading");
    setError("");

    if (!isLiked) {
      const { payload }: any = await dispatch(upvotePost({ postId }));

      if (!payload.success) {
        setError(payload.message);
        setStatus("failure");
      } else {
        setStatus("success");
      }
    } else {
      const { payload }: any = await dispatch(unvotePost({ postId }));

      if (!payload.success) {
        setError(payload.message);
        setStatus("failure");
      } else {
        setStatus("success");
      }
    }
  };

  return [status, error, handleUpvote] as const;
}

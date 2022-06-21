import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { selectPost, savePost, removePost } from "../features/post/postSlice";
import { useState } from "react";

export default function useFavorite() {
  const dispatch: AppDispatch = useDispatch();
  const { isSaved } = useSelector(selectPost);

  const [status, setStatus] = useState<
    "idle" | "loading" | "failure" | "success"
  >("idle");
  const [error, setError] = useState("");

  const handleFavorite = async (postId: string) => {
    setStatus("loading");
    setError("");

    if (!isSaved) {
      const { payload }: any = await dispatch(savePost({ postId }));

      if (!payload.success) {
        setError(payload.message);
        setStatus("failure");
      } else {
        setStatus("success");
      }
    } else {
      const { payload }: any = await dispatch(removePost({ postId }));

      if (!payload.success) {
        setError(payload.message);
        setStatus("failure");
      } else {
        setStatus("success");
      }
    }
  };

  return [status, error, handleFavorite] as const;
}

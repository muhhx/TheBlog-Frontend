import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../features/user/userSlice";
import { AppDispatch } from "../app/store";

export default function useDeletePost() {
  const dispatch: AppDispatch = useDispatch();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");
  const [error, setError] = useState("");

  const deleteHandler = async (id: string) => {
    setStatus("loading");
    setError("");

    const { payload }: any = await dispatch(deletePost({ id }));

    if (!payload.success) {
      setError(payload.message);
      setStatus("failure");
    } else {
      setStatus("success");
    }
  };

  return [status, error, deleteHandler] as const;
}

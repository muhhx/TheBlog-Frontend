import { useDispatch } from "react-redux";
import { createPost } from "../features/user/userSlice";
import { AppDispatch } from "../app/store";
import { useState } from "react";

export default function useCreatePost() {
  const dispatch: AppDispatch = useDispatch();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");
  const [error, setError] = useState("");

  const create = async (data: {
    title: string;
    summaryInput: string;
    image: string;
    content: string;
  }) => {
    setStatus("loading");
    setError("");

    const { payload }: any = await dispatch(createPost(data));

    if (!payload.success) {
      setError(payload.message);
      setStatus("failure");
    } else {
      setStatus("success");
    }
  };

  return [status, error, create] as const;
}

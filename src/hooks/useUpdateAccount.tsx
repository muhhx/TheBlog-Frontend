import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { updateAccount } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function useUpdateAccount() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");

  const update = async (payloadData: {
    name: string;
    username: string;
    bio: string;
    picture: string;
  }) => {
    setStatus("loading");
    setError("");

    const filteredPayload = {
      name: payloadData.name || undefined,
      username: payloadData.username || undefined,
      bio: payloadData.bio || undefined,
      picture: payloadData.picture || undefined,
    };

    const { payload }: any = await dispatch(updateAccount(filteredPayload));

    if (!payload.success) {
      setError(payload.message);
      setStatus("failure");
    } else {
      setStatus("success");
      payloadData.username
        ? navigate(`/user/${payloadData.username}`)
        : navigate(-1);
    }
  };

  return [status, error, update] as const;
}

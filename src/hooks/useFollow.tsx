import { useState } from "react";
import { useDispatch } from "react-redux";
import { followUser } from "../features/user/userSlice";
import useAxiosPrivate from "./useAxiosPrivate";

export default function useFollow() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const follow = async (id: string, username: string, name: string) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.post(`/api/follow/${id}`);

      dispatch(followUser({ name, username, _id: id }));
      setSuccess(true);
    } catch (error) {
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
  };

  return [success, error, loading, follow] as const;
}

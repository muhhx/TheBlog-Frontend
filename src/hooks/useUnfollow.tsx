import { useState } from "react";
import { useDispatch } from "react-redux";
import { unfollowUser } from "../features/user/userSlice";
import useAxiosPrivate from "./useAxiosPrivate";

export default function useUnfollow() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const unfollow = async (id: string, userId: string) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.delete(`/api/follow/${id}`);

      dispatch(unfollowUser({ userId }));
      setSuccess(true);
    } catch (error) {
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
  };

  return [success, error, loading, unfollow] as const;
}

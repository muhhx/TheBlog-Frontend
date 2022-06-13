import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { IPost } from "../features/user/userTypes";

export default function useFavorites() {
  const axiosPrivate = useAxiosPrivate();

  const [favorites, setFavorites] = useState<IPost[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getFavorites = async (username: string) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get(
        `/api/user/${username}/favorites`
      );
      setFavorites(response.data.data);
    } catch (error) {
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
  };

  return [favorites, error, loading, getFavorites] as const;
}

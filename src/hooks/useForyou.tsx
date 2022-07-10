import { useState, useEffect } from "react";
import axiosPrivate from "../config/axios";
import { IPostResponse } from "../features/post/postTypes";

export default function useForyou(pageNumber: number) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<IPostResponse[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setStatus("loading");
        setError("");

        const { data } = await axiosPrivate.get(
          `/api/user/:id/foryou?page=${pageNumber}`
        );

        setPosts([...posts, ...data]);
        setHasMore(data.length > 0);
        setStatus("success");
      } catch (error) {
        setError("Não foi possível carregar o conteúdo, recarregue a página");
        setStatus("failure");
      }
    };
    getData();
  }, [pageNumber]);

  return [status, error, hasMore, posts] as const;
}

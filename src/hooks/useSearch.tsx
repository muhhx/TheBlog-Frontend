import { useEffect, useState } from "react";
import axios from "axios";

export default function useSearch(searchTerm: string, pageNumber: number) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");
  const [error, setError] = useState("");

  const [posts, setPosts] = useState<any>([]);
  const [hasMorePosts, setHasMorePosts] = useState(false);

  const [users, setUsers] = useState<any>([]);
  const [hasMoreUsers, setHasMoreUsers] = useState(false);

  useEffect(() => {
    setStatus("loading");
    setError("");

    let cancel: any;
    axios({
      method: "GET",
      url: "http://localhost:5000/search?product",
      params: { q: searchTerm, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPosts((prevBooks: any) => {
          return [...prevBooks, res.data.docs.map((book: any) => book.title)];
        });
        setHasMorePosts(res.data.docs.length > 0);
        setStatus("success");
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setStatus("failure");
        setError("Erro!!!");
      });
    return () => cancel();
  }, [searchTerm, pageNumber]);

  return [status, error, posts, users] as const;
}

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { fetchPosts } from "../../features/posts/postsSlice";

export default function Home() {
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (posts.status === "idle") {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <div>
      <p>Home page</p>
      <Link to="/private"> IR PARA PRIVADO</Link>
      <Link to="/login"> FAZER LOGIN</Link>
      {posts.status === "pending" || posts.status === "idle" ? (
        <div>LOADING...</div>
      ) : posts.status === "failure" ? (
        <div>{posts.error}</div>
      ) : (
        posts.posts.map((post) => <p key={post._id}>Post</p>)
      )}
    </div>
  );
}

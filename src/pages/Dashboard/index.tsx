import { useSelector } from "react-redux";
import { selectPosts } from "../../features/posts/postsSlice";

import * as C from "./styles";
import Spinner from "../../components/Spinner";
import PostCard from "./PostCard";

export default function Dashboard() {
  const { status, posts, error } = useSelector(selectPosts);

  return (
    <>
      {status === "idle" || status === "pending" ? (
        <Spinner />
      ) : status === "failure" ? (
        <span>{error}</span>
      ) : (
        <C.PostsContainer>
          {posts.map((post) => (
            <PostCard
              key={post._id}
              image={post.image}
              summary={post.summary}
              title={post.title}
            />
          ))}
        </C.PostsContainer>
      )}
    </>
  );
}

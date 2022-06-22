import { useSelector } from "react-redux";
import { selectPosts } from "../../features/posts/postsSlice";

import * as C from "./styles";
import Spinner from "../../components/Spinner";
import Card from "../../components/Card";

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
            <Card
              key={post._id}
              post={post}
              type="publicPost"
              isCurrentUser={false}
            />
          ))}
        </C.PostsContainer>
      )}
    </>
  );
}

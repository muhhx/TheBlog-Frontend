import { useState, useRef, useCallback } from "react";
import useDiscover from "../../hooks/useDiscover";
import Spinner from "../../components/Spinner";
import Card from "../../components/Card";
import * as C from "./styles";

export default function Dashboard() {
  const [pageNumber, setPageNumber] = useState(0);
  const [status, error, hasMore, posts] = useDiscover(pageNumber);

  const observer: any = useRef();
  const lastPostElementRef = useCallback(
    (node: any) => {
      if (status === "loading" || status === "failure") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, hasMore]
  );

  return (
    <>
      <C.Wrapper>
        <C.Title>Discover The Blog</C.Title>
        <C.Span>Role para baixo e descubra nossos posts...</C.Span>
      </C.Wrapper>

      <C.PostsContainer>
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <Card
                lastPostElementRef={lastPostElementRef}
                key={post._id}
                post={post}
                type="publicPost"
                isCurrentUser={false}
              />
            );
          } else {
            return (
              <Card
                key={post._id}
                post={post}
                type="publicPost"
                isCurrentUser={false}
              />
            );
          }
        })}
      </C.PostsContainer>

      {status === "failure" && (
        <C.Container>
          <C.ApiError>{error}</C.ApiError>
        </C.Container>
      )}

      {(status === "idle" || status === "loading") && (
        <C.Container>
          <Spinner />
        </C.Container>
      )}
    </>
  );
}

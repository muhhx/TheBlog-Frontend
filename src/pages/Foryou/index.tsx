import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useForyou from "../../hooks/useFotyou";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import * as C from "./styles";

export default function Foryou() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [status, error, hasMore, posts] = useForyou(pageNumber);

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
      {!hasMore &&
        status !== "failure" &&
        status !== "loading" &&
        status !== "idle" &&
        posts.length === 0 && (
          <C.Wrapper>
            <C.Span>
              Nesta página aparecerão os posts das pessoas que você segue.
            </C.Span>
            <C.Button onClick={() => navigate("/")}>Navegar posts</C.Button>
          </C.Wrapper>
        )}

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

      {status === "loading" && (
        <C.Container>
          <Spinner />
        </C.Container>
      )}

      {status === "failure" && (
        <C.Container>
          <C.ApiError>{error}</C.ApiError>
        </C.Container>
      )}
    </>
  );
}

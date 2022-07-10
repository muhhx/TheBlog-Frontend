import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../features/auth/authSlice";
import useForyou from "../../hooks/useForyou";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import * as C from "./styles";

export default function Foryou() {
  const navigate = useNavigate();
  const { isAuth } = useSelector(selectAuthState);
  const [pageNumber, setPageNumber] = useState(0);
  const [status, error, hasMore, posts] = useForyou(pageNumber);

  const observer: any = useRef();
  const lastPostElementRef = useCallback(
    (node: any) => {
      if (!isAuth || status === "loading" || status === "failure") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, hasMore, isAuth]
  );

  return (
    <>
      <C.Header>
        <C.Title>For You</C.Title>
        <C.Subtitle>Acompanhe as pessoas que você segue.</C.Subtitle>
      </C.Header>

      {!hasMore &&
        status !== "failure" &&
        status !== "loading" &&
        status !== "idle" &&
        posts.length === 0 && (
          <C.Wrapper>
            <C.Span>Siga mais pessoas e acompanhe suas histórias.</C.Span>
            <C.Button onClick={() => navigate("/")}>Descobrir posts</C.Button>
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

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../../components/Spinner";
import Content from "./Content";
import Buttons from "./Buttons";
import * as C from "./styles";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchPostData } from "../../features/post/postSlice";
import { selectAuthState } from "../../features/auth/authSlice";
import { selectPost } from "../../features/post/postSlice";

export default function Post() {
  const { slug } = useParams();

  const { isAuth, userId } = useSelector(selectAuthState);
  const post = useSelector(selectPost);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (slug && userId) dispatch(fetchPostData({ slug, userId }));
  }, [slug, userId]);

  return (
    <C.Container>
      <C.Wrapper>
        {post.status === "pending" && (
          <C.StatusContainer>
            <Spinner />
          </C.StatusContainer>
        )}

        {post.status === "failure" && (
          <C.StatusContainer>
            <div>{post.error}</div>
          </C.StatusContainer>
        )}

        {post.status === "success" && (
          <>
            <C.HeaderContainer>
              <C.Title>{post.data.title}</C.Title>
              <C.Summary>{post.data.summary}</C.Summary>
            </C.HeaderContainer>
            <C.Image image={post.data.image} />
          </>
        )}

        {post.status === "success" && !isAuth && (
          <>
            <C.Unauthorized>
              <C.Span>
                Faça o <C.NavLink to="/login">Login</C.NavLink> ou
                <C.NavLink to="/register"> Registre-se</C.NavLink> para poder
                continuar lendo nosso conteúdo!
              </C.Span>
            </C.Unauthorized>
          </>
        )}

        {post.status === "success" && isAuth && (
          <>
            <C.UserContainer>
              <C.User>
                <C.Picture image={post.user.picture} />
                <C.UserWrapper>
                  <C.Name>{post.user.name}</C.Name>
                  <C.Information>
                    @{post.user.username}, {post.data.createdAt}
                  </C.Information>
                </C.UserWrapper>
              </C.User>
              <Buttons
                isLiked={post.isLiked}
                isSaved={post.isSaved}
                upvotesCount={post.upvotesCount}
                postId={post.data._id}
              />
            </C.UserContainer>
            <Content content={post.data.content} />
          </>
        )}
      </C.Wrapper>
    </C.Container>
  );
}

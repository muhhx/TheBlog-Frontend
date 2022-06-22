import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectAuthState } from "../../features/auth/authSlice";
import { selectUserAll, fetchAllUserData } from "../../features/user/userSlice";

import * as C from "./styles";
import Spinner from "../../components/Spinner";
import Card from "../../components/Card";
import Buttons from "./Buttons";
import Data from "./Data";

export default function Profile() {
  const [option, setOption] = useState<"posts" | "favorites">("posts");
  const { id } = useParams();
  const auth = useSelector(selectAuthState);
  const user = useSelector(selectUserAll);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (id && auth.userId !== undefined)
      dispatch(fetchAllUserData({ username: id, userId: auth.userId }));
    setOption("posts");
  }, [id, auth.userId]);

  return (
    <>
      {user.status === "pending" && (
        <C.LoadingContainer>
          <Spinner />
        </C.LoadingContainer>
      )}

      {user.status === "failure" && (
        <C.LoadingContainer>
          <div>{user.error}</div>
        </C.LoadingContainer>
      )}

      {user.status === "success" && (
        <C.Container>
          <C.AsideWrapper>
            <C.Information>
              <C.ProfileHeader>
                <C.Picture image={user.profile.picture} />
                <C.SpanWrapper>
                  <C.Name>{user.profile.name}</C.Name>
                  <C.Span>@{user.profile.username}</C.Span>
                  <C.Span>{user.profile.bio}</C.Span>
                </C.SpanWrapper>
              </C.ProfileHeader>

              <Buttons
                isBeingFollowed={user.isBeingFollowed}
                isCurrentUser={user.isCurrentUser}
                isAuth={auth.isAuth}
                id={user.profile._id}
              />

              <Data user={user} />
            </C.Information>
          </C.AsideWrapper>

          <C.MainWrapper>
            <C.OptionWrapper>
              <C.Option
                onClick={() => setOption("posts")}
                selected={option === "posts" ? true : false}
              >
                Posts
              </C.Option>

              {user.isCurrentUser && (
                <C.Option
                  onClick={() => setOption("favorites")}
                  selected={option === "favorites" ? true : false}
                >
                  Favoritos
                </C.Option>
              )}
            </C.OptionWrapper>

            <C.Posts>
              {option === "posts" &&
                user.posts.map((post) => (
                  <Card
                    key={post._id}
                    post={post}
                    type={"userPosts"}
                    isCurrentUser={user.isCurrentUser}
                  />
                ))}

              {option === "favorites" &&
                user.favorites &&
                user.favorites.map((post) => (
                  <Card
                    key={post._id}
                    post={post}
                    type={"userFavorites"}
                    isCurrentUser={user.isCurrentUser}
                  />
                ))}
            </C.Posts>
          </C.MainWrapper>
        </C.Container>
      )}
    </>
  );
}

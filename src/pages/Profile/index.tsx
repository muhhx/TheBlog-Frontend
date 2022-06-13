import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectAuthState } from "../../features/auth/authSlice";
import { selectUserAll, fetchAllUserData } from "../../features/user/userSlice";
import { IPost } from "../../features/user/userTypes";

import useFollow from "../../hooks/useFollow";
import useUnfollow from "../../hooks/useUnfollow";

import * as C from "./styles";
import Spinner from "../../components/Spinner";
import PostCard from "./PostCard";

const FOLLOW_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/7.0.0/png/iconmonstr-plus-circle-filled.png&r=255&g=255&b=255";
const EDIT_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-edit-10.png&r=255&g=255&b=255";

export default function Profile() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(selectAuthState);
  const user = useSelector(selectUserAll);
  const [followStatus, followError, follow] = useFollow();
  const [unfollowStatus, unfollowError, unfollow] = useUnfollow();

  const [option, setOption] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setOption(0);
  }, [user.profile._id]);

  useEffect(() => {
    if (id && (auth.userId || auth.userId === null)) {
      dispatch(fetchAllUserData({ username: id, userId: auth.userId }));
    }
  }, [id, auth.userId]);

  const handleButtonSubmit = async () => {
    if (!auth.isAuth) return navigate("/login");
    if (user.isCurrentUser) return navigate("/editor");
    if (!user.isBeingFollowed && user.profile._id)
      return follow(user.profile._id);
    if (user.profile._id) return unfollow(user.profile._id);
  };

  return (
    <>
      {user.status === "idle" || user.status === "pending" ? (
        <C.LoadingContainer>
          <Spinner />
        </C.LoadingContainer>
      ) : user.status === "failure" ? (
        <C.LoadingContainer>
          <div>{user.error}</div>
        </C.LoadingContainer>
      ) : (
        <C.Container>
          <C.AsideWrapper>
            <C.Information>
              <C.ProfileHeader>
                <C.Picture image={user.profile.picture} />
                {followStatus === "loading" || unfollowStatus === "loading" ? (
                  <Spinner />
                ) : (
                  ""
                )}
                <C.SpanWrapper>
                  <C.Name>{user.profile.name}</C.Name>
                  <C.Span>@{user.profile.username}</C.Span>
                  <C.Span>{user.profile.bio}</C.Span>
                </C.SpanWrapper>
              </C.ProfileHeader>
              {!user.isBeingFollowed ? (
                <C.Button onClick={handleButtonSubmit}>
                  {user.isCurrentUser ? "Editar Perfil" : "Seguir"}
                  <C.Icon image={FOLLOW_ICON} />
                </C.Button>
              ) : (
                <C.Unfollow
                  onMouseOver={() => setHover(true)}
                  onMouseOut={() => setHover(false)}
                  hover={hover}
                  onClick={handleButtonSubmit}
                >
                  {hover ? "Deixar de seguir" : "Seguindo"}
                </C.Unfollow>
              )}
              <C.DataWrapper>
                <C.DataContainer>
                  <span>Posts:</span>
                  <span style={{ fontWeight: "600" }}>{user.posts.length}</span>
                </C.DataContainer>
                <C.DataContainer>
                  <span style={{ cursor: "pointer" }}>Seguidores:</span>
                  <span style={{ fontWeight: "600", cursor: "pointer" }}>
                    {user.followersCount}
                  </span>
                </C.DataContainer>
                <C.DataContainer>
                  <span style={{ cursor: "pointer" }}>Seguindo:</span>
                  <span style={{ fontWeight: "600", cursor: "pointer" }}>
                    {user.followingCount}
                  </span>
                </C.DataContainer>
              </C.DataWrapper>
            </C.Information>
          </C.AsideWrapper>
          <C.MainWrapper>
            <C.OptionWrapper>
              <C.Option
                onClick={() => setOption(0)}
                selected={option === 0 ? true : false}
              >
                Posts
              </C.Option>
              {user.isCurrentUser ? (
                <C.Option
                  onClick={() => setOption(1)}
                  selected={option === 1 ? true : false}
                >
                  Favoritos
                </C.Option>
              ) : (
                ""
              )}
            </C.OptionWrapper>
            <C.Posts>
              {option === 0
                ? user.posts.map((post: IPost, i) => (
                    <PostCard
                      key={i}
                      image={post.image}
                      summary={post.summary}
                      title={post.title}
                    />
                  ))
                : !user.favorites
                ? ""
                : user.favorites.map((post: IPost, i) => (
                    <PostCard
                      key={i}
                      image={post.image}
                      summary={post.summary}
                      title={post.title}
                    />
                  ))}
            </C.Posts>
          </C.MainWrapper>
        </C.Container>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectAuthState } from "../../features/auth/authSlice";
import { selectUserAll, fetchAllUserData } from "../../features/user/userSlice";
import { IPost } from "../../features/user/userTypes";

import useFollow from "../../hooks/useFollow";
import useUnfollow from "../../hooks/useUnfollow";
import useFavorites from "../../hooks/useFavorites";

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
  const [fSuccess, fError, fLoading, follow] = useFollow();
  const [uSuccess, uError, uLoading, unfollow] = useUnfollow();
  const [favorites, error, loading, getFavorites] = useFavorites();

  const [option, setOption] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (id && (auth.userId || auth.userId === null)) {
      dispatch(fetchAllUserData({ username: id, userId: auth.userId }));
      if (user.isCurrentUser) getFavorites(id);
    }
  }, [id, auth.userId]);

  const handleButtonSubmit = async () => {
    if (!auth.isAuth) return navigate("/login");
    if (user.isCurrentUser) return navigate("/editor");
    if (!user.isBeingFollowed && auth.username && auth.name)
      return follow(user.profile._id, auth.username, auth.name);
    if (auth.userId) return unfollow(user.profile._id, auth.userId);
  };

  return (
    <C.Container>
      {user.status === "idle" || user.status === "pending" ? (
        <C.Container>
          <Spinner />
        </C.Container>
      ) : user.status === "failure" ? (
        <div>{user.error}</div>
      ) : (
        <>
          <C.AsideWrapper>
            <C.Information>
              <C.ProfileHeader>
                <C.Picture image={user.profile.picture} />
                {fLoading || uLoading ? <Spinner /> : ""}
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
              {option === 0 ? (
                user.posts.map((post: IPost, i) => (
                  <PostCard
                    key={i}
                    image={post.image}
                    summary={post.summary}
                    title={post.title}
                  />
                ))
              ) : loading ? (
                <Spinner />
              ) : error ? (
                <C.Span>{error}</C.Span>
              ) : (
                favorites.map((post: IPost, i) => (
                  <PostCard
                    key={i}
                    image={post.image}
                    summary={post.summary}
                    title={post.title}
                  />
                ))
              )}
            </C.Posts>
          </C.MainWrapper>
        </>
      )}
    </C.Container>
  );
}

//O PENDING E ERROR DOS ESTADOS REDUX SAO EM RELAÇÃO A FETCHING THE DATA APENAS! PARA FAZER QUALQUER OUTRA FUNÇÃO NA API, FAZER DENTRO DO COMPONENTE

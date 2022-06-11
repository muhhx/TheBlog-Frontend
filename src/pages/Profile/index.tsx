import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import axiosPublic from "../../config/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import * as C from "./styles";
import Spinner from "../../components/Spinner";
import PostCard from "./PostCard";

const FOLLOW_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/7.0.0/png/iconmonstr-plus-circle-filled.png&r=255&g=255&b=255";
const EDIT_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-edit-10.png&r=255&g=255&b=255";

export default function Profile() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const { userId, isAuth } = useSelector(selectAuth);

  const [option, setOption] = useState(0);
  const [following, setFollowing] = useState(false);
  const [hover, setHover] = useState(false);

  const [userName, setUserName] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userInfoId, setUserInfoId] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userFollowers, setUserFollowers] = useState<any>([]);
  const [userFollowing, setUserFollowing] = useState<any>([]);

  const [userPosts, setUserPosts] = useState<any>([]);
  const [userPostsLoading, setUserPostsLoading] = useState(false);
  const [userPostsError, setUserPostsError] = useState("");

  const [userFavs, setUserFavs] = useState<any>([]);
  const [userFavsLoading, setUserFavsLoading] = useState(false);
  const [userFavsError, setUserFavsError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await axiosPublic.get(`/api/user/${id}`);

        setUserInfoId(user.data.data[0]._id);
        setUserName(user.data.data[0].name);
        setUserUsername(user.data.data[0].username);
        setUserPicture(user.data.data[0].picture);
        setUserBio(user.data.data[0].bio);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchUserFollowing = async () => {
      try {
        const following = await axiosPublic.get(`/api/user/${id}/following`);

        setUserFollowing(following.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserFollowing();
  }, [following]);

  useEffect(() => {
    if (userId !== userInfoId) {
      const isFollowing = userFollowers.find((fol: any) => fol._id === userId);
      if (isFollowing) {
        setFollowing(true);
      }
    }
  }, [userInfoId, userId, userFollowers]);

  useEffect(() => {
    const fetchUserFollowers = async () => {
      try {
        const followers = await axiosPublic.get(`/api/user/${id}/followers`);

        setUserFollowers(followers.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserFollowers();
  }, [following]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setUserPostsLoading(true);
        const posts = await axiosPublic.get(`/api/user/${id}/posts`);
        setUserPosts(posts.data.data);
        setUserPostsLoading(false);
      } catch (error) {
        console.log(error);
        setUserPostsLoading(false);
      }
    };
    fetchUserPosts();
  }, []);

  useEffect(() => {
    const fetchUserFavs = async () => {
      try {
        setUserFavsLoading(true);
        const favs = await axiosPrivate.get(`/api/user/${id}/favorites`);
        setUserFavs(favs.data.data);
        setUserFavsLoading(false);
      } catch (error) {
        console.log(error);
        setUserFavsLoading(false);
      }
    };
    if (isAuth && userId === userInfoId) {
      fetchUserFavs();
    }
  }, [isAuth]);

  const handleUnfollow = async () => {
    try {
      await axiosPrivate.delete(`/api/follow/${userInfoId}`);
      setFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async () => {
    try {
      await axiosPrivate.post(`/api/follow/${userInfoId}`);
      setFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <C.Container>
      <C.AsideWrapper>
        <C.Information>
          <C.ProfileHeader>
            <C.Picture image={userPicture} />
            <C.SpanWrapper>
              <C.Name>{userName}</C.Name>
              <C.Span>@{userUsername}</C.Span>
              <C.Span>{userBio}</C.Span>
            </C.SpanWrapper>
          </C.ProfileHeader>
          {userId === userInfoId ? (
            <C.Button onClick={() => navigate("/editor")}>
              <C.Icon image={EDIT_ICON} />
              <span style={{ paddingTop: "2px" }}>Editar Perfil</span>
            </C.Button>
          ) : !isAuth ? (
            <C.Button onClick={() => navigate("/login")}>
              <C.Icon image={FOLLOW_ICON} />
              <span style={{ paddingTop: "2px" }}>Seguir</span>
            </C.Button>
          ) : !following ? (
            <C.Button onClick={handleFollow}>
              <C.Icon image={FOLLOW_ICON} />
              <span style={{ paddingTop: "2px" }}>Seguir</span>
            </C.Button>
          ) : (
            <C.Unfollow
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
              hover={hover}
              onClick={handleUnfollow}
            >
              {hover ? "Deixar de seguir" : "Seguindo"}
            </C.Unfollow>
          )}
          <C.DataWrapper>
            <C.DataContainer>
              <span>Posts:</span>
              <span style={{ fontWeight: "600" }}>{userPosts.length}</span>
            </C.DataContainer>
            <C.DataContainer>
              <span style={{ cursor: "pointer" }}>Seguidores:</span>
              <span style={{ fontWeight: "600", cursor: "pointer" }}>
                {userFollowers.length}
              </span>
            </C.DataContainer>
            <C.DataContainer>
              <span style={{ cursor: "pointer" }}>Seguindo:</span>
              <span style={{ fontWeight: "600", cursor: "pointer" }}>
                {userFollowing.length}
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
          {userId === userInfoId ? (
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
            userPostsLoading ? (
              <Spinner />
            ) : userPostsError ? (
              "Error"
            ) : (
              userPosts.map((post: any) => (
                <PostCard
                  key={post._id}
                  image={post.image}
                  summary={post.summary}
                  title={post.title}
                />
              ))
            )
          ) : userFavsLoading ? (
            <Spinner />
          ) : userFavsError ? (
            <C.Span>Erro</C.Span>
          ) : userFavs.length === 0 ? (
            <C.Span>Você ainda não possui posts favoritos.</C.Span>
          ) : (
            userFavs.map((post: any) => (
              <PostCard
                key={post._id}
                image={post.image}
                summary={post.summary}
                title={post.title}
              />
            ))
          )}
        </C.Posts>
      </C.MainWrapper>
    </C.Container>
  );
}

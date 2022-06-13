import { axiosPublic, axiosPrivate } from "../../config/axios";

const fetchUserInfo = async (username: string) => {
  const response = await axiosPublic.get(`/api/user/${username}`);

  return response.data;
};

const fetchUserFollowing = async (username: string) => {
  const response = await axiosPublic.get(`/api/user/${username}/following`);

  return response.data;
};

const fetchUserFollowers = async (username: string) => {
  const response = await axiosPublic.get(`/api/user/${username}/followers`);

  return response.data;
};

const fetchUserPosts = async (username: string) => {
  const response = await axiosPublic.get(`/api/user/${username}/posts`);

  return response.data;
};

const fetchUserFavorites = async (username: string) => {
  const response = await axiosPrivate.get(`/api/user/${username}/favorites`);

  return response.data.data;
};

const followUser = async (id: string) => {
  const response = await axiosPrivate.post(`/api/follow/${id}`);

  return response;
};

const unfollowUser = async (id: string) => {
  const response = await axiosPrivate.delete(`/api/follow/${id}`);

  return response;
};

const userServices = {
  fetchUserInfo,
  fetchUserFollowing,
  fetchUserFollowers,
  fetchUserPosts,
  fetchUserFavorites,
  followUser,
  unfollowUser,
};

export default userServices;

//USER STATE:
//Follow V
//Unfollow
//UpdateUserInfo (username, etc) SO DAR OPCAO PRA MUDAR USERNAME!
//RemoveFavorite
//AddFavorite
//CreatePost
//EditPost
//DeletePost

//POST STATE:
//Like post
//Comment, etc

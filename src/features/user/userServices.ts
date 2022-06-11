import axiosPublic from "../../config/axios";

const fetchUserInfo = async (username: string) => {
  const response = await axiosPublic.get(`/api/user/${username}`);

  return response.data;
};

const fetchUserPosts = async (username: string) => {
  const response = await axiosPublic.get(`/api/user/${username}/posts`);

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

const userServices = {
  fetchUserInfo,
  fetchUserPosts,
  fetchUserFollowing,
  fetchUserFollowers,
};

export default userServices;
// //isFollowing

//Follow
//Unfollow
//UpdateUserInfo (username, etc)
//RemoveFavorite
//AddFavorite
//CreatePost
//EditPost
//DeletePost

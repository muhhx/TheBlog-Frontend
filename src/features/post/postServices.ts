import axiosPublic from "../../config/axios";
import { axiosPrivate } from "../../config/axios";
import { IPostData, IPostUser, IUpvotedUser } from "./postTypes";

const getPostData = async (slug: string) => {
  const { data } = await axiosPublic.get(`/api/post/${slug}`);

  const user: IPostUser = data.user;
  const post: IPostData = data.data;

  return { user, post };
};

const getPostUpvotes = async (postId: string) => {
  const { data } = await axiosPublic.get(`/api/upvote/${postId}`);

  return data.data as IUpvotedUser[];
};

const getFavoriteCheck = async (postId: string, userId: string | null) => {
  const { data } = await axiosPublic.put(`/api/favorite/${postId}`, { userId });

  return data.isSaved as boolean;
};

const upvotePost = async (postId: string) => {
  await axiosPrivate.post(`/api/upvote/${postId}`);
};

const unvotePost = async (postId: string) => {
  await axiosPrivate.delete(`/api/upvote/${postId}`);
};

const savePost = async (postId: string) => {
  await axiosPrivate.post(`/api/favorite/${postId}`);
};

const removePost = async (postId: string) => {
  await axiosPrivate.delete(`/api/favorite/${postId}`);
};

const postServices = {
  getPostData,
  getPostUpvotes,
  getFavoriteCheck,
  upvotePost,
  unvotePost,
  savePost,
  removePost,
};

export default postServices;

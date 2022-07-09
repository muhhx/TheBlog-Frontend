import axiosPublic from "../../config/axios";
import { axiosPrivate } from "../../config/axios";
import {
  IComment,
  ICommentData,
  IPostData,
  IPostUser,
  IUpvotedUser,
} from "./postTypes";

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

const createComment = async (comment: string, postId: string) => {
  const { data } = await axiosPrivate.post(`/api/comment/${postId}`, {
    comment,
  });

  return data as ICommentData;
};

const getComments = async (postId: string) => {
  const { data } = await axiosPublic.get(`/api/comment/${postId}`);

  return data as ICommentData[];
};

const deleteComment = async (commentId: string) => {
  axiosPrivate.delete(`/api/comment/${commentId}`);
};

const updateComment = async (commentId: string, comment: string) => {
  const { data } = await axiosPrivate.put(`/api/comment/${commentId}`, {
    comment,
  });

  return data as IComment;
};

const postServices = {
  getPostData,
  getPostUpvotes,
  getFavoriteCheck,
  getComments,
  upvotePost,
  unvotePost,
  savePost,
  removePost,
  createComment,
  deleteComment,
  updateComment,
};

export default postServices;

import axiosPublic from "../../config/axios";

const fetchPosts = async () => {
  const response = await axiosPublic.get("/api/post");

  return response.data;
};

const postsService = {
  fetchPosts,
};

export default postsService;

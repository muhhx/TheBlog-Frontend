import BASE_URL from "../../config/axios";

const fetchPosts = async () => {
    const response = await BASE_URL.get("/post");

    return response.data;
};

const postsService = {
    fetchPosts
};

export default postsService;

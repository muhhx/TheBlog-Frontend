import axiosPublic from "../../config/axios";

const fetch = async () => {
  const response = await axiosPublic.get("/api/background");

  return response;
};

const backgroundServices = {
  fetch,
};

export default backgroundServices;

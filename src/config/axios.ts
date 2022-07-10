import axios from "axios";
import config from "./default";

export const axiosPublic = axios.create({
  withCredentials: true,
  baseURL: config.BASE_SERVER_URL,
});

export const axiosPrivate = axios.create({
  withCredentials: true,
  baseURL: config.BASE_SERVER_URL,
});

const refresh = async () => {
  try {
    const response = await axiosPublic.put("/api/session");

    return response.data;
  } catch (error) {
    return error;
  }
};

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      const response = await refresh();

      if (!response) return Promise.reject(error);

      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosPublic;

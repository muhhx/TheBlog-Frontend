import { axiosPrivateFetch, axiosPublic } from "../../config/axios";

export const fetchSession = async () => {
  const response = await axiosPrivateFetch.get("/api/session");

  return response.data.data;
};

export const logoutSession = async () => {
  const response = await axiosPublic.delete("/api/session");

  return response;
};

const authServices = {
  fetchSession,
  logoutSession,
};

export default authServices;

import { axiosPrivate, axiosPublic } from "../../config/axios";

export const fetchSession = async () => {
  const response = await axiosPrivate.get("/api/session");

  return response.data.data;
};

export const loginSession = async (email: string, password: string) => {
  const response = await axiosPublic.post("/api/session", { email, password });

  return response.data;
};

export const logoutSession = async () => {
  const response = await axiosPublic.delete("/api/session");

  return response;
};

const authServices = {
  fetchSession,
  loginSession,
  logoutSession,
};

export default authServices;

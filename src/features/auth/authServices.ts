import { axiosPrivate, axiosPublic } from "../../config/axios";
import { IAccountUpdate } from "./authTypes";

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

export const updateAccount = async (payload: {
  name?: string;
  username?: string;
  bio?: string;
  picture?: string;
}) => {
  const { data } = await axiosPrivate.put("/api/user", payload);

  return data.newUserData as IAccountUpdate;
};

export const changePassword = async (
  password: string,
  passwordConfirmation: string
) => {
  await axiosPrivate.put("/api/user/password", {
    password,
    passwordConfirmation,
  });
};

export const deleteAccount = async () => {};

const authServices = {
  fetchSession,
  loginSession,
  logoutSession,
  updateAccount,
  changePassword,
};

export default authServices;

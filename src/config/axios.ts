import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const axiosPublic = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export default axiosPublic;

import axios from "axios";

export const BASE_URL = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api",
});

export const axiosPrivate = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
});

export default BASE_URL;

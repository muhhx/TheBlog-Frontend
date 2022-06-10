import useRefresh from "./useRefresh";
import { axiosPrivate } from "../config/axios";

export default function useAxiosPrivate() {
  const refresh = useRefresh();

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error.config;
      if (error.response.status === 403 && !prevRequest.sent) {
        prevRequest.sent = true;
        await refresh();
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
}

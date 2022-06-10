import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import axiosPublic from "../config/axios";

export default function useRefresh() {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await axiosPublic.put("/api/session");

      return response.data;
    } catch (error) {
      dispatch(logout());
      return error;
    }
  };

  return refresh;
}

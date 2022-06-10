import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import BASE_URL from "../config/axios";

export default function useRefresh() {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await BASE_URL.put("/session");

      return response.data;
    } catch (error) {
      dispatch(logout());
      return error;
    }
  };

  return refresh;
}

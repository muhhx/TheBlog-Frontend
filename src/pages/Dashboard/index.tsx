import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import BASE_URL from "../../config/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const userName = useSelector((state: RootState) => state.auth.name);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await BASE_URL.delete("/session");

      dispatch(logout());
      navigate("/");
    } catch (error: any) {
      if (error?.response?.data?.message) {
        // return setErr(error.response.data.message);
      } else {
        // return setErr("Algo deu errado ao fazer o login");
      }
    }
  };

  return (
    <div>
      Dashboard do {userName}
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}

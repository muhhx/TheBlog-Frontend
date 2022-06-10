import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import BASE_URL from "../../config/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const userName = useSelector((state: RootState) => state.auth.name);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  return <div>Dashboard do {userName}</div>;
}

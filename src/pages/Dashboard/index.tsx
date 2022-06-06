import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"
import { logoutUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate()

  function logout () {
    dispatch(logoutUser());
    navigate('/')
  };

  return (
    <div>Dashboard
      <button onClick={logout}>LOGOUT</button>
    </div>
  )
}

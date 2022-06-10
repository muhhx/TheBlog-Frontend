import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import axiosPublic from "../../config/axios";
import * as C from "./styles";

export default function Header() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { isAuth, status, name } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = async () => {
    try {
      const response = await axiosPublic.delete("/api/session");

      dispatch(logout());
      navigate("/");
    } catch (error) {}
  };

  return (
    <C.Header>
      <C.Container>
        <span>THE BLOG.</span>
        <div>Searchbar</div>
        {isAuth ? (
          <C.ButtonWrapper>
            <C.Button onClick={handleLogout}>Log Out</C.Button>
          </C.ButtonWrapper>
        ) : (
          <C.ButtonWrapper>
            <Link to="/login">
              <C.LoginButton>Log In</C.LoginButton>
            </Link>
            <Link to="/register">
              <C.Button>Sign Up</C.Button>
            </Link>
          </C.ButtonWrapper>
        )}
      </C.Container>
    </C.Header>
  );
}

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthState } from "../../features/auth/authSlice";
import useLogout from "../../hooks/useLogout";

import * as C from "./styles";
import Spinner from "../Spinner";

const NOTI_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2013/png/iconmonstr-bell-1.png&r=43&g=43&b=43";

export default function Header() {
  const [status, error, logout] = useLogout();
  const auth = useSelector(selectAuthState);
  const navigate = useNavigate();

  return (
    <C.Header>
      <C.Container>
        <C.Wrapper>
          <span onClick={() => navigate("/")}>THE BLOG.</span>
          <span>Discover</span>
          <span>For you (only auth)</span>
        </C.Wrapper>
        <div>Searchbar</div>
        {auth.isAuth ? (
          <C.Wrapper>
            <C.Icon image={NOTI_ICON} />
            <C.Button onClick={() => navigate("/new")}>Novo Post</C.Button>
            <C.LoginButton onClick={logout}>
              Log Out {status === "loading" ? <Spinner /> : ""}
            </C.LoginButton>
            <C.Profile
              image={auth.picture ? auth.picture : ""}
              onClick={() => navigate(`/user/${auth.username}`)}
            />
          </C.Wrapper>
        ) : (
          <C.Wrapper>
            <C.ButtonLink to="/login">
              <C.LoginButton>Log In</C.LoginButton>
            </C.ButtonLink>
            <C.ButtonLink to="/register">
              <C.Button>Sign Up</C.Button>
            </C.ButtonLink>
          </C.Wrapper>
        )}
      </C.Container>
    </C.Header>
  );
}

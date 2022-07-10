import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../features/auth/authSlice";
import useLogout from "../../hooks/useLogout";
import usePanel from "../../hooks/usePanel";
import * as C from "./styles";
import Spinner from "../Spinner";

const CLOSE_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/7.2.0/png/iconmonstr-x-mark-lined.png&r=50&g=50&b=50";

export default function Menu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { close } = usePanel();
  const { isAuth, name, username } = useSelector(selectAuthState);
  const [status, error, logout] = useLogout();

  const [currentPage, setCurrentPage] = useState<
    null | "discover" | "foryou" | "sobre"
  >(null);

  useEffect(() => {
    if (pathname === "/") setCurrentPage("discover");
    else if (pathname === "/foryou") setCurrentPage("foryou");
    else setCurrentPage(null);
  }, [pathname]);

  return (
    <C.Container>
      <C.Header>
        <C.Close image={CLOSE_ICON} onClick={close} />
        <span>THE BLOG.</span>
      </C.Header>

      <C.PageNavigation isSelected={currentPage === "discover" ? true : false}>
        <C.ButtonLink to="/">Discover</C.ButtonLink>
      </C.PageNavigation>

      {isAuth && (
        <C.PageNavigation isSelected={currentPage === "foryou" ? true : false}>
          <C.ButtonLink to="/foryou">For You</C.ButtonLink>
        </C.PageNavigation>
      )}

      <C.ButtonWrapper>
        {isAuth && (
          <C.ButtonLink to="/new">
            <C.Button>Novo Post</C.Button>
          </C.ButtonLink>
        )}

        {isAuth && (
          <C.LoginButton onClick={logout}>
            Logout {status === "loading" && <Spinner />}
          </C.LoginButton>
        )}

        {!isAuth && (
          <C.ButtonLink to="/login">
            <C.LoginButton>Login</C.LoginButton>
          </C.ButtonLink>
        )}

        {!isAuth && (
          <C.ButtonLink to="/register">
            <C.Button>Register</C.Button>
          </C.ButtonLink>
        )}
      </C.ButtonWrapper>
    </C.Container>
  );
}

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { selectAuthState } from "../../features/auth/authSlice";
import useLogout from "../../hooks/useLogout";
import usePanel from "../../hooks/usePanel";

import * as C from "./styles";
import Spinner from "../Spinner";

const MENU_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/7.3.0/png/iconmonstr-menu-lined.png&r=50&g=50&b=50";

export default function Header() {
  const { pathname } = useLocation();
  const auth = useSelector(selectAuthState);
  const navigate = useNavigate();
  const { open } = usePanel();
  const [status, error, logout] = useLogout();
  const [currentPage, setCurrentPage] = useState<
    null | "discover" | "foryou" | "search"
  >(null);

  useEffect(() => {
    if (pathname === "/") setCurrentPage("discover");
    else if (pathname === "/foryou") setCurrentPage("foryou");
    else if (pathname.includes("search")) setCurrentPage("search");
    else setCurrentPage(null);
  }, [pathname]);

  return (
    <C.Header>
      <C.Container>
        <C.Wrapper>
          <C.Hamburger image={MENU_ICON} onClick={() => open("menu")} />
          <C.PageNavigation
            onClick={() => navigate("/")}
            isSelected={currentPage === "discover" ? true : false}
          >
            Discover
          </C.PageNavigation>
          {auth.isAuth && (
            <C.PageNavigation
              onClick={() => navigate("/foryou")}
              isSelected={currentPage === "foryou" ? true : false}
            >
              For You
            </C.PageNavigation>
          )}
          <C.PageNavigation
            onClick={() => navigate("/search")}
            isSelected={currentPage === "search" ? true : false}
          >
            Search
          </C.PageNavigation>
        </C.Wrapper>
        {auth.isAuth ? (
          <C.Wrapper>
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

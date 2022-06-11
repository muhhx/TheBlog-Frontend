import Header from "../Header";
import { Outlet } from "react-router-dom";
import * as C from "./styles";

export default function Layout() {
  return (
    <>
      <Header />
      <C.Main>
        <C.Container>
          <Outlet />
        </C.Container>
      </C.Main>
      <footer>Footer</footer>
    </>
  );
}

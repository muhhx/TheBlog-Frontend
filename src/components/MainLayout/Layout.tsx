import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
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
      <Footer />
    </>
  );
}

import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPanelState } from "../../features/panel/panelSlice";
import usePanel from "../../hooks/usePanel";

import Menu from "../Menu";
import Create from "../Create";
import DeletePost from "../DeletePost";
import Followers from "../Followers";
import Following from "../Following";
import * as C from "../PanelLayout/styles";

export default function PanelLayout() {
  const { pathname } = useLocation();
  const { close } = usePanel();
  const { display, category, payload } = useSelector(selectPanelState);

  useEffect(() => {
    close();
  }, [pathname]);

  return (
    <>
      {display && (
        <C.PanelContainer>
          <C.Panel>
            {category === "menu" && <Menu />}
            {category === "seguidores" && <Followers />}
            {category === "seguindo" && <Following />}
            {category === "create" &&
              payload !== null &&
              typeof payload !== "string" && (
                <Create title={payload?.title} content={payload?.content} />
              )}
            {category === "delete" && typeof payload === "string" && (
              <DeletePost id={payload} />
            )}
          </C.Panel>
        </C.PanelContainer>
      )}
      <Outlet />
    </>
  );
}

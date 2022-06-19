import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPanelState } from "../../features/panel/panelSlice";
import usePanel from "../../hooks/usePanel";

import Create from "./Create";
import DeletePost from "./DeletePost";
import * as C from "./styles";

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
            {category === "seguidores" && <div>Seguidores</div>}
            {category === "seguindo" && <div>Seguindo</div>}
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

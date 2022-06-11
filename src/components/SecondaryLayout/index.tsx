import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectBackground } from "../../features/background/backgroundSlice";

import * as C from "./styles";
import backgroundImage from "../../assets/background-default-image.jpg";

export default function SecondaryLayout() {
  const { status, image } = useSelector(selectBackground);

  return (
    <C.Section
      backgroundImage={
        status !== "idle" && status !== "pending"
          ? !image
            ? backgroundImage
            : image
          : ""
      }
    >
      <C.SectionBackground>
        <C.FormContainer>
          <Outlet />
        </C.FormContainer>
      </C.SectionBackground>
    </C.Section>
  );
}

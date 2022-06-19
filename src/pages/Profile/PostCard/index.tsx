import { useSelector } from "react-redux";
import { selectAuthState } from "../../../features/auth/authSlice";
import usePanel from "../../../hooks/usePanel";

import * as C from "./styles";
import arrow from "../../../assets/arrow.png";

const ICON_TRASH =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2017/png/iconmonstr-trash-can-27.png&r=255&g=255&b=255";
const ICON_EDIT =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2017/png/iconmonstr-pencil-16.png&r=255&g=255&b=255";

interface IProps {
  id: string;
  authorId: string;
  image: string;
  summary: string;
  title: string;
}

export default function PostCard({
  id,
  authorId,
  image,
  summary,
  title,
}: IProps) {
  const { open } = usePanel();
  const { isAuth, userId } = useSelector(selectAuthState);

  return (
    <C.Container>
      <C.Image image={image}>
        <C.Fade />
        {isAuth && userId === authorId && (
          <C.EditWrapper>
            <C.IconContainer image={ICON_EDIT} />
            <C.IconContainer
              image={ICON_TRASH}
              onClick={() => open("delete", id)}
            />
          </C.EditWrapper>
        )}
      </C.Image>
      <C.Wrapper>
        <C.Information>
          tags
          <C.Title>{title}</C.Title>
          <C.Summary>{summary}</C.Summary>
        </C.Information>
        <C.Button>
          <C.ButtonSpan>Ler</C.ButtonSpan>
          <C.ButtonArrow image={arrow} />
        </C.Button>
      </C.Wrapper>
    </C.Container>
  );
}

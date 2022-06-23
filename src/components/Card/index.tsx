import { IPost } from "../../features/user/userTypes";
import usePanel from "../../hooks/usePanel";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { removeFavorite } from "../../features/user/userSlice";

import * as C from "./styles";

interface IProps {
  type: "publicPost" | "userPosts" | "userFavorites";
  post: IPost;
  isCurrentUser: boolean;
}

const ARROW_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2018/png/iconmonstr-arrow-right-thin.png&r=50&g=50&b=50";
const SAVED_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2013/png/iconmonstr-bookmark-3.png&r=255&g=255&b=255";
const DELETE_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2013/png/iconmonstr-trash-can-16.png&r=255&g=255&b=255";
const EDIT_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2018/png/iconmonstr-text-28.png&r=255&g=255&b=255";

export default function Card({ post, type, isCurrentUser }: IProps) {
  const dispatch: AppDispatch = useDispatch();
  const { open } = usePanel();

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite({ postId: post._id }));
  };

  return (
    <C.Container>
      <C.Image image={post.image}>
        <C.Fade />
      </C.Image>

      <C.Wrapper>
        <C.Information>
          <C.Title>{post.title}</C.Title>
          <C.Summary>{post.summary}</C.Summary>
        </C.Information>

        <C.Buttons>
          {type === "userPosts" && isCurrentUser && (
            <C.UserPosts>
              <C.Edit>
                <span>Editar</span>
                <C.FlexButton>
                  <C.ReadDivisor>|</C.ReadDivisor>
                  <C.Icon image={EDIT_ICON} />
                </C.FlexButton>
              </C.Edit>
              <C.Delete onClick={() => open("delete", post._id)}>
                <span>Deletar</span>
                <C.FlexButton>
                  <C.ReadDivisor>|</C.ReadDivisor>
                  <C.Icon image={DELETE_ICON} />
                </C.FlexButton>
              </C.Delete>
            </C.UserPosts>
          )}

          {type === "userFavorites" && isCurrentUser && (
            <C.Save onClick={handleRemoveFavorite}>
              <span>Remover</span>
              <C.FlexButton>
                <C.ReadDivisor>|</C.ReadDivisor>
                <C.Icon image={SAVED_ICON} />
              </C.FlexButton>
            </C.Save>
          )}

          <C.NavLink to={`/post/${post.slug}`}>
            <C.Read>
              <span>Ler post</span>
              <C.FlexButton>
                <C.ReadDivisor>|</C.ReadDivisor>
                <C.Icon image={ARROW_ICON} />
              </C.FlexButton>
            </C.Read>
          </C.NavLink>
        </C.Buttons>
      </C.Wrapper>
    </C.Container>
  );
}

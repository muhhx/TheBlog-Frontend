import usePanel from "../../../hooks/usePanel";
import useDeletePost from "../../../hooks/useDeletePost";

import Spinner from "../../Spinner";
import * as C from "./styles";

const CLOSE_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/7.2.0/png/iconmonstr-x-mark-lined.png&r=188&g=188&b=188";

export default function DeletePost({ id }: { id: string }) {
  const [status, error, deletePost] = useDeletePost();
  const { close } = usePanel();

  const handleDeletePost = () => {
    deletePost(id);
    close();
  };

  return (
    <C.Container>
      <C.Form>
        <C.CloseContainer>
          <C.Close backgroundUrl={CLOSE_ICON} onClick={close} />
        </C.CloseContainer>
        <C.Wrapper>
          <C.Header>Deletar</C.Header>
          <C.Span>
            Tem certeza que deseja deletar este post?{" "}
            <C.NavLink to="/">Voltar.</C.NavLink>
          </C.Span>
          {error ? <C.Error>{error}</C.Error> : ""}
        </C.Wrapper>
        <C.Button
          disabled={status === "loading" ? true : false}
          onClick={handleDeletePost}
        >
          {status === "loading" ? <Spinner /> : "Confirmar"}
        </C.Button>
      </C.Form>
    </C.Container>
  );
}

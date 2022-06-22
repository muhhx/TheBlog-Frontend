import * as C from "./styles";
import usePanel from "../../../hooks/usePanel";
import { IUser } from "../../../features/user/userTypes";

export default function Data({ user }: { user: IUser }) {
  const { open } = usePanel();

  return (
    <C.DataWrapper>
      <C.DataContainer>
        <C.SpanButton>Posts</C.SpanButton>
        <C.NumberSpan>{user.posts.length}</C.NumberSpan>
      </C.DataContainer>
      <C.DataContainer>
        <C.SpanButton onClick={() => open("seguidores")}>
          Seguidores
        </C.SpanButton>
        <C.NumberSpan>{user.followersCount}</C.NumberSpan>
      </C.DataContainer>
      <C.DataContainer>
        <C.SpanButton onClick={() => open("seguindo")}>Seguindo</C.SpanButton>
        <C.NumberSpan>{user.followingCount}</C.NumberSpan>
      </C.DataContainer>
    </C.DataWrapper>
  );
}

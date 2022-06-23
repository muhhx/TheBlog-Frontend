import usePanel from "../../hooks/usePanel";
import * as C from "./styles";
import ChangePassword from "./ChangePassword";
import ChangeData from "./ChangeData";

export default function Editor() {
  const { open } = usePanel();

  return (
    <C.Container>
      <C.Wrapper>
        <C.Section>
          <C.Header>Editar usuário</C.Header>
          <ChangeData />
        </C.Section>

        <C.Section>
          <C.Header>Atualizar senha</C.Header>
          <ChangePassword />
        </C.Section>

        <C.Button onClick={() => open("deleteAccount")}>Deletar Conta</C.Button>
      </C.Wrapper>
    </C.Container>
  );
}

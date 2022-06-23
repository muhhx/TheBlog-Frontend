import * as C from "./styles";
import ChangePassword from "./ChangePassword";
import ChangeData from "./ChangeData";

export default function Editor() {
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

        <div>delete account bttn - COMPONENTE</div>
      </C.Wrapper>
    </C.Container>
  );
}

//Nao preciso gerar novo JWT pois a unica info relevate seria o userID
//Atualizar essa infos no redux/auth (mudar informações sobre o usuario autenticado)

//useUpdateAccount
//useUpdatePassword
//useDeleteAccount

//Usar panel para confirmar deletar conta (prover senha atual)

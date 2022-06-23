import { useState } from "react";
import useDeleteAccount from "../../hooks/useDeleteAccount";
import usePanel from "../../hooks/usePanel";

import WhiteSpinner from "../WhiteSpinner";
import Input from "../Input";
import * as C from "./styles";

const CLOSE_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/7.2.0/png/iconmonstr-x-mark-lined.png&r=188&g=188&b=188";

export default function DeleteAccount() {
  const { close } = usePanel();
  const [status, error, deleteAcc] = useDeleteAccount();
  const [password, setPassword] = useState("");

  return (
    <C.Container>
      <C.Wrapper>
        <C.CloseContainer>
          <C.Close image={CLOSE_ICON} onClick={close} />
        </C.CloseContainer>

        <C.Header>Deletar conta</C.Header>
        <span>Para deletar sua conta, informe sua senha</span>
        {status === "failure" && <C.Error>{error}</C.Error>}

        <Input
          label="Senha"
          inputType="password"
          state={password}
          setState={setPassword}
          validState={true}
          error="Senha inválida"
        />

        <C.Delete
          onClick={() => deleteAcc(password)}
          disabled={status === "loading" && true}
        >
          Confirmar
          {status === "loading" && <WhiteSpinner />}
        </C.Delete>
      </C.Wrapper>
    </C.Container>
  );
}

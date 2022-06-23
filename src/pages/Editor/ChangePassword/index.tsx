import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useChangePassword from "../../../hooks/useChangePassword";

import Spinner from "../../../components/Spinner";
import Input from "../../../components/Input";
import * as C from "./styles";

const PWD_REJEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function ChangePassword() {
  const navigate = useNavigate();
  const [status, error, change] = useChangePassword();

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  useEffect(() => {
    setValidPassword(PWD_REJEX.test(password));
    setPasswordsMatch(password === passwordConfirmation);
  }, [password, passwordConfirmation]);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    change(password, passwordConfirmation);
  };

  return (
    <C.Form onSubmit={handleChangePassword}>
      {status === "failure" && <C.Error>{error}</C.Error>}
      {status === "success" && (
        <C.Span>
          Sua senha foi atualizada com sucesso.
          <C.NavLink onClick={() => navigate(-1)}>
            Voltar para o perfil.
          </C.NavLink>
        </C.Span>
      )}

      <Input
        label="New password"
        inputType="password"
        state={password}
        validState={validPassword}
        setState={setPassword}
        error="Senha inválida"
      />
      <Input
        label="New password confirmation"
        inputType="password"
        state={passwordConfirmation}
        validState={passwordsMatch}
        setState={setPasswordConfirmation}
        error="As senhas não são iguais!"
      />
      <C.Button
        disabled={
          !validPassword || !passwordsMatch || status === "loading"
            ? true
            : false
        }
      >
        Atualizar
        {status === "loading" ? <Spinner /> : ""}
      </C.Button>
    </C.Form>
  );
}

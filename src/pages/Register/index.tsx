import React, { useState, useEffect } from "react";
import axiosPublic from "../../config/axios";
import Spinner from "../../components/Spinner";
import Input from "../../components/Input";
import * as C from "./styles";

const NAME_REJEX = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
const PWD_REJEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState<null | boolean>(null);

  const [matchEmail, setMatchEmail] = useState("");
  const [validMatchEmail, setValidMatchEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setValidName(NAME_REJEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidEmail(null);
    setValidMatchEmail(email === matchEmail);
  }, [email, matchEmail]);

  useEffect(() => {
    setValidPwd(PWD_REJEX.test(pwd));
    setValidMatchPwd(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosPublic.post("/api/user", {
        name,
        email,
        emailConfirmation: matchEmail,
        password: pwd,
        passwordConfirmation: matchPwd,
      });
    } catch (err: any) {
      setLoading(false);
      if (err.response?.data?.error?.code === 11000) {
        return setValidEmail(false);
      } else if (err?.response?.data?.message) {
        return setError(err.response.data.message);
      } else {
        return setError(
          "Algo deu errado ao tentar criar sua conta, tente novamente mais tarde."
        );
      }
    }

    await axiosPublic.post("/api/confirmemail", { email });
    setSuccess(true);
    setName("");
    setEmail("");
    setMatchEmail("");
    setPwd("");
    setMatchPwd("");
    setLoading(false);
  };

  return (
    <>
      {success && (
        <C.HeaderWrapper>
          <p>THE BLOG.</p>
          <C.Header>Conta criada!</C.Header>
          <C.Span>
            Um email de confirmação foi enviado para seu email. Verifique sua
            caixa de spam!
          </C.Span>
          <C.NavLink to="/login"> Login.</C.NavLink>
        </C.HeaderWrapper>
      )}

      {!success && (
        <C.Form onSubmit={handleSubmit}>
          <p>THE BLOG.</p>
          <C.HeaderWrapper>
            <C.Header>Criar uma conta</C.Header>
            <C.Span>
              Você já possui uma conta?
              <C.NavLink to="/login"> Login.</C.NavLink>
            </C.Span>
            {error ? <C.ApiError>{error}</C.ApiError> : ""}
          </C.HeaderWrapper>

          <C.InputWrapper>
            <Input
              label="Full Name"
              inputType="text"
              state={name}
              validState={validName}
              setState={setName}
              error="Nome inválido"
              max={30}
            />

            <Input
              label="Email adress"
              inputType="text"
              state={email}
              validState={validEmail}
              setState={setEmail}
              error="Este email já existe"
            />

            <Input
              label="Email Confirmation"
              inputType="text"
              state={matchEmail}
              validState={validMatchEmail}
              setState={setMatchEmail}
              error="Os emails precisam ser iguais."
            />

            <Input
              label="Password"
              inputType="password"
              state={pwd}
              validState={validPwd}
              setState={setPwd}
              error="Senha inválida."
            />

            <Input
              label="Password confirmation"
              inputType="password"
              state={matchPwd}
              validState={validMatchPwd}
              setState={setMatchPwd}
              error="As senhas precisam ser iguais."
            />

            {/* <C.Panel>
                  Sua senha deve conter:
                  <br />
                  8 a 24 caracteres.
                  <br />
                  Caracter em uppercase, lowercase, um número e um caracter
                  especial.
                  <br />
                  Os caracteres especiais permitidos são ! @ # $ %
                </C.Panel> */}
          </C.InputWrapper>

          <C.ButtonContainer>
            <C.Button
              disabled={
                !validName ||
                !validMatchEmail ||
                !validPwd ||
                !validMatchPwd ||
                loading
                  ? true
                  : false
              }
            >
              Criar conta
              {loading ? <Spinner /> : ""}
            </C.Button>
          </C.ButtonContainer>
        </C.Form>
      )}
    </>
  );
}

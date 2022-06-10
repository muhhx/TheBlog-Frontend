import React, { useState, useEffect } from "react";
import BASE_URL from "../../config/axios";
import Spinner from "../../components/Spinner";
import * as C from "./styles";

//adicionar loading state quano fazer a requisição
//fazer background dinamico
//arrumar painel mostrando como deve ser a senha

const NAME_REJEX = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
const PWD_REJEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const ERR_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-warning-7.png&r=255&g=94&b=94";
const OK_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2017/png/iconmonstr-check-mark-15.png&r=13&g=122&b=13";
const SHOW_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-eye-8.png&r=116&g=116&b=116";
const INFO_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-info-7.png&r=20&g=115&b=230";

export default function Register() {
  const [showPwd, setShowPwd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
      const response = await BASE_URL.post("/user", {
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

    await BASE_URL.post("/confirmemail", { email });
    setSuccess(true);
    setName("");
    setEmail("");
    setMatchEmail("");
    setPwd("");
    setMatchPwd("");
    setShowPwd(false);
    setLoading(false);
  };

  return (
    <>
      {success ? (
        <C.HeaderWrapper>
          <p>THE BLOG.</p>
          <C.Header>Conta criada!</C.Header>
          <C.Span>
            Um email de confirmação foi enviado para seu email. Verifique sua
            caixa de spam!
          </C.Span>
          <C.NavLink to="/login"> Login.</C.NavLink>
        </C.HeaderWrapper>
      ) : (
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
            <C.InputContainer>
              <C.Label htmlFor="name">Full Name</C.Label>
              <C.InputHolder>
                <C.Input
                  type="text"
                  id="name"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={30}
                />
                {!validName && name ? <C.Icon backgroundUrl={ERR_ICON} /> : ""}
                {validName ? <C.Icon backgroundUrl={OK_ICON} /> : ""}
              </C.InputHolder>
              {validName || !name ? "" : <C.Error>Nome inválido.</C.Error>}
            </C.InputContainer>
            <C.InputContainer>
              <C.Label htmlFor="email">Email address</C.Label>
              <C.InputHolder>
                <C.Input
                  type="text"
                  id="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {!validEmail && validEmail !== null ? (
                  <C.Icon backgroundUrl={ERR_ICON} />
                ) : (
                  ""
                )}
                {validEmail && validEmail !== null ? (
                  <C.Icon backgroundUrl={OK_ICON} />
                ) : (
                  ""
                )}
              </C.InputHolder>
              {!validEmail && validEmail !== null ? (
                <C.Error>Este email já existe.</C.Error>
              ) : (
                ""
              )}
            </C.InputContainer>
            <C.InputContainer>
              <C.Label htmlFor="emailConfirmation">Email confirmation</C.Label>
              <C.InputHolder>
                <C.Input
                  type="text"
                  id="emailConfirmation"
                  autoComplete="off"
                  value={matchEmail}
                  onChange={(e) => setMatchEmail(e.target.value)}
                  required
                />
                {!validMatchEmail && matchEmail ? (
                  <C.Icon backgroundUrl={ERR_ICON} />
                ) : (
                  ""
                )}
                {validMatchEmail && matchEmail ? (
                  <C.Icon backgroundUrl={OK_ICON} />
                ) : (
                  ""
                )}
              </C.InputHolder>
              {validMatchEmail || !matchEmail ? (
                ""
              ) : (
                <C.Error>Os emails precisam ser iguais.</C.Error>
              )}
            </C.InputContainer>
            <C.InputContainer>
              <C.Label htmlFor="pwd">Password</C.Label>
              <C.PwdInfo
                backgroundUrl={INFO_ICON}
                onMouseOver={() => setShowInfo(true)}
                onMouseOut={() => setShowInfo(false)}
                onClick={() => setShowInfo(!showInfo ? true : false)}
              />
              {!showInfo ? (
                ""
              ) : (
                <C.Panel>
                  Sua senha deve conter:
                  <br />
                  8 a 24 caracteres.
                  <br />
                  Caracter em uppercase, lowercase, um número e um caracter
                  especial.
                  <br />
                  Os caracteres especiais permitidos são ! @ # $ %
                </C.Panel>
              )}
              <C.InputHolder>
                <C.Input
                  type={showPwd ? "text" : "password"}
                  id="pwd"
                  autoComplete="off"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                />
                {!validPwd && pwd ? <C.Icon backgroundUrl={ERR_ICON} /> : ""}
                {validPwd ? <C.Icon backgroundUrl={OK_ICON} /> : ""}
                <C.ShowPwd
                  backgroundUrl={SHOW_ICON}
                  onClick={() => setShowPwd(showPwd === false ? true : false)}
                />
              </C.InputHolder>
              {!validPwd && pwd ? <C.Error>Senha inválida.</C.Error> : ""}
            </C.InputContainer>
            <C.InputContainer>
              <C.Label htmlFor="pwdConfirmation">Password confirmation</C.Label>
              <C.InputHolder>
                <C.Input
                  type={showPwd ? "text" : "password"}
                  id="pwdConfirmation"
                  autoComplete="off"
                  value={matchPwd}
                  onChange={(e) => setMatchPwd(e.target.value)}
                />
                {!validMatchPwd && matchPwd ? (
                  <C.Icon backgroundUrl={ERR_ICON} />
                ) : (
                  ""
                )}
                {validMatchPwd && matchPwd ? (
                  <C.Icon backgroundUrl={OK_ICON} />
                ) : (
                  ""
                )}
              </C.InputHolder>
              {!validMatchPwd && matchPwd ? (
                <C.Error>As senhas precisam ser iguais.</C.Error>
              ) : (
                ""
              )}
            </C.InputContainer>
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

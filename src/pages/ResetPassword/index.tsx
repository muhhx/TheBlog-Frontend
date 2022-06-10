import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosPublic from "../../config/axios";

import * as C from "./styles";
import Spinner from "../../components/Spinner";

const PWD_REJEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const ERR_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-warning-7.png&r=255&g=94&b=94";
const OK_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2017/png/iconmonstr-check-mark-15.png&r=13&g=122&b=13";
const SHOW_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-eye-8.png&r=116&g=116&b=116";
const INFO_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-info-7.png&r=20&g=115&b=230";

export default function ResetPassword() {
  const { id } = useParams();

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPwd, setShowPwd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setValidPwd(PWD_REJEX.test(pwd));
    setValidMatchPwd(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosPublic.put(`/api/resetpassword/${id}`);

      setSuccess(true);
      setPwd("");
      setMatchPwd("");
      setShowPwd(false);
      setShowInfo(false);
      setLoading(false);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Não foi possível atualizar sua senha.");
      }
    }
    setLoading(false);
  };

  return (
    <>
      {success ? (
        <C.HeaderWrapper>
          <C.Header>Senha Atualizada!</C.Header>
          <C.Span>
            Agora você já pode iniciar sessão.
            <C.NavLink to="/login"> Fazer login.</C.NavLink>
          </C.Span>
        </C.HeaderWrapper>
      ) : (
        <C.Form onSubmit={handleSubmit}>
          <p>THE BLOG.</p>
          <C.HeaderWrapper>
            <C.Header>Informe Sua Nova Senha</C.Header>
            <C.Span>
              Você já possui uma conta?
              <C.NavLink to="/login"> Login.</C.NavLink>
            </C.Span>
            {error ? <C.ApiError>{error}</C.ApiError> : ""}
          </C.HeaderWrapper>
          <C.InputWrapper>
            <C.InputContainer>
              <C.Label htmlFor="pwd">Password</C.Label>
              <C.PwdInfo
                backgroundUrl={INFO_ICON}
                onMouseOver={() => setShowInfo(true)}
                onMouseOut={() => setShowInfo(false)}
                onClick={() => setShowInfo(!showInfo ? true : false)}
              />
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
              disabled={!validPwd || !validMatchPwd || loading ? true : false}
            >
              Atualizar senha
              {loading ? <Spinner /> : ""}
            </C.Button>
          </C.ButtonContainer>
        </C.Form>
      )}
    </>
  );
}

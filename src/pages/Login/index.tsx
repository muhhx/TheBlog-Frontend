import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import BASE_URL from "../../config/axios";
import * as C from "./styles";

const SHOW_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-eye-8.png&r=116&g=116&b=116";

export default function Login() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [displayPwd, setDisplayPwd] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
  }, [email, pwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !pwd) {
      return setErr("Preencha todos os campos.");
    }

    if (isAuth) {
      return setErr(
        "Você já está logado, faça o logout para acessar outra conta."
      );
    }

    try {
      const response = await BASE_URL.post("/session", {
        email,
        password: pwd,
      });

      setEmail("");
      setPwd("");
      setDisplayPwd(false);
      setErr("");

      navigate("/private");
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return setErr(error.response.data.message);
      } else {
        return setErr("Algo deu errado ao fazer o login");
      }
    }
  };

  return (
    <C.Section>
      <C.FormContainer>
        <C.Form onSubmit={handleSubmit}>
          <p>THE BLOG.</p>
          <C.HeaderWrapper>
            <C.Header>Iniciar Sessão</C.Header>
            <C.Span>
              Você não possui uma conta?
              <C.NavLink to="/register"> Registrar.</C.NavLink>
            </C.Span>
            {err ? <C.Error>{err}</C.Error> : ""}
          </C.HeaderWrapper>
          <C.InputWrapper>
            <C.InputContainer>
              <C.Label htmlFor="email">Email</C.Label>
              <C.Input
                type="text"
                id="email"
                autoComplete="off"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </C.InputContainer>
            <C.InputContainer>
              <C.Label htmlFor="pwd">Password</C.Label>
              <C.Input
                type={!displayPwd ? "password" : "text"}
                id="pwd"
                autoComplete="off"
                required
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
              />
              <C.ShowPwd
                onClick={() => setDisplayPwd(!displayPwd ? true : false)}
                backgroundUrl={SHOW_ICON}
              />
            </C.InputContainer>
          </C.InputWrapper>
          <C.ButtonContainer>
            <C.Button disabled={!email || !pwd ? true : false}>
              Fazer Login
            </C.Button>
          </C.ButtonContainer>
          <C.ShortContainer>
            <span>
              <C.ShortLink to="/forgotpassword">
                Esqueci minha senha
              </C.ShortLink>
            </span>
            <span>
              <C.ShortLink to="/confirmpassword">
                Confirmar meu email
              </C.ShortLink>
            </span>
          </C.ShortContainer>
        </C.Form>
      </C.FormContainer>
    </C.Section>
  );
}

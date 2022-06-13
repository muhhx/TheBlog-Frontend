import { useState, useEffect } from "react";
import useLogin from "../../hooks/useLogin";

import * as C from "./styles";
import Spinner from "../../components/Spinner";

const SHOW_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-eye-8.png&r=116&g=116&b=116";

export default function Login() {
  const [status, error, setError, login] = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <C.Form onSubmit={handleLogin}>
      <p>THE BLOG.</p>
      <C.HeaderWrapper>
        <C.Header>Iniciar Sessão</C.Header>
        <C.Span>
          Você não possui uma conta?
          <C.NavLink to="/register"> Registrar.</C.NavLink>
        </C.Span>
        {error ? <C.Error>{error}</C.Error> : ""}
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
            type={!displayPassword ? "password" : "text"}
            id="pwd"
            autoComplete="off"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <C.ShowPwd
            onClick={() => setDisplayPassword(!displayPassword ? true : false)}
            backgroundUrl={SHOW_ICON}
          />
        </C.InputContainer>
      </C.InputWrapper>
      <C.ButtonContainer>
        <C.Button
          disabled={!email || !password || status === "loading" ? true : false}
        >
          Fazer Login
          {status === "loading" ? <Spinner /> : ""}
        </C.Button>
      </C.ButtonContainer>
      <C.ShortContainer>
        <span>
          <C.ShortLink to="/forgotpassword">Esqueci minha senha</C.ShortLink>
        </span>
        <span>
          <C.ShortLink to="/confirmemail">Confirmar meu email</C.ShortLink>
        </span>
      </C.ShortContainer>
    </C.Form>
  );
}

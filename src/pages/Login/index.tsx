import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import BASE_URL from "../../config/axios";
import { login } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";
import * as C from "./styles";

const SHOW_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-eye-8.png&r=116&g=116&b=116";

export default function Login() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [displayPwd, setDisplayPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
  }, [email, pwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !pwd) return setErr("Preencha todos os campos.");

    if (isAuth) {
      setErr("Você já está logado, faça o logout para acessar outra conta.");
      return setLoading(false);
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
      setLoading(false);
      dispatch(login(response.data.userName));
      navigate("/private");
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setErr(error.response.data.message);
      } else {
        setErr("Algo deu errado ao fazer o login");
      }
      setLoading(false);
    }
  };

  return (
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
        <C.Button disabled={!email || !pwd || loading ? true : false}>
          Fazer Login
          {loading ? <Spinner /> : ""}
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

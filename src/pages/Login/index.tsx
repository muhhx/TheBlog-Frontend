import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { loginUser } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

import * as C from "./styles";

export default function Login() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);

  async function submitLogin(e: React.MouseEvent) {
    e.preventDefault();

    setErr(null);
    if (auth.isAuth) {
      return setErr("Você já está logado!");
    }
    const result = await dispatch(loginUser({ email, password }));
    console.log(result);

    if (result.error) {
      return setErr(result.payload);
    }

    navigate("/private");
  }

  return (
    <C.Section>
      <C.Login>
        <C.HeaderContainer>
          <C.Title>Fazer Login</C.Title>
          {auth.status === "pending" ? <p>Loading...</p> : ""}
          {err ? <p style={{ color: "red" }}>{err}</p> : ""}
        </C.HeaderContainer>
        <C.FieldsContainer>
          <C.InputContainer>
            <C.Input
              type="email"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </C.InputContainer>
          <C.InputContainer>
            <C.Input
              type="password"
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </C.InputContainer>
          <C.Button onClick={(e) => submitLogin(e)}>Fazer Login</C.Button>
        </C.FieldsContainer>
        <C.OptionsContainer>
          <C.Span>
            Novo usuário? <Link to="/register">Criar uma conta</Link>
          </C.Span>
          <C.Span>
            Esqueceu sua senha? <Link to="/register">Mandar email</Link>
          </C.Span>
        </C.OptionsContainer>
      </C.Login>
    </C.Section>
  );
}

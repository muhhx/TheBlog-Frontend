import React, { useEffect, useState } from "react";
import BASE_URL from "../../config/axios";
import * as C from "./styles";

export default function ConfirmEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState("");

  useEffect(() => {
    setError("");
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await BASE_URL.post("/confirmemail", { email });

      console.log(response);
      setSuccess(true);
      setEmail("");
      setError("");
      setLoading(false);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Não foi possível mandar seu email de confirmação");
      }
    }
    setLoading(false);
  };

  return (
    <C.Section>
      <C.FormContainer>
        {success ? (
          <C.HeaderWrapper>
            <p>THE BLOG.</p>
            <C.Header>Email enviado!</C.Header>
            <C.Span>
              Um email de confirmação foi enviado para seu email. Não esqueça de
              verificar sua caixa de spam e lixeira!
            </C.Span>
            <C.NavLink to="/login"> Login.</C.NavLink>
          </C.HeaderWrapper>
        ) : (
          <C.Form onSubmit={handleSubmit}>
            <span>THE BLOG.</span>
            <C.HeaderWrapper>
              <C.Header>Confirmar e-mail</C.Header>
              <C.Span>
                Já confirmou o email?<C.NavLink to="/login"> Login.</C.NavLink>
              </C.Span>
              {error ? <C.Error>{error}</C.Error> : ""}
              {loading ? "Loading..." : ""}
            </C.HeaderWrapper>
            <C.InputContainer>
              <C.Label htmlFor="email">Email address</C.Label>
              <C.Input
                type="text"
                id="email"
                autoComplete="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </C.InputContainer>
            <C.ButtonContainer>
              <C.Button disabled={!email ? true : false}>Enviar email</C.Button>
            </C.ButtonContainer>
          </C.Form>
        )}
      </C.FormContainer>
    </C.Section>
  );
}

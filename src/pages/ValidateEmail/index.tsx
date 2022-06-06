import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../config/axios";
import * as C from "./styles";

//Quando o usuário cair na pagina, automaticamente fazer uma requisição axios e confirmar email ou nao
export default function ValidateEmail() {
  const { id } = useParams();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        setLoading(true);
        const response = await BASE_URL.put(`/confirmemail/${id}`);

        console.log(response);
        setSuccess(true);
      } catch (error: any) {
        if (error?.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("Não foi possível confirmar seu email");
        }
      }
      setLoading(false);
    };
    confirmEmail();
  }, []);
  return (
    <C.Section>
      <C.FormContainer>
        {loading ? (
          "Loading..."
        ) : success ? (
          <C.HeaderWrapper>
            <C.Header>Email Confirmado!</C.Header>
            <C.Span>
              Agora você já pode iniciar sessão.
              <C.NavLink to="/login"> Fazer login.</C.NavLink>
            </C.Span>
          </C.HeaderWrapper>
        ) : (
          <C.HeaderWrapper>
            <C.Header>Algo deu errado!</C.Header>
            <C.Span>
              Você já possui uma conta?
              <C.NavLink to="/login"> Login.</C.NavLink>
            </C.Span>
            <C.Error>{error}</C.Error>
          </C.HeaderWrapper>
        )}
      </C.FormContainer>
    </C.Section>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import axiosPublic from "../../config/axios";
import * as C from "./styles";

export default function ValidateEmail() {
  const { id } = useParams();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.put(`/api/confirmemail/${id}`);

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
    <>
      {loading ? (
        <Spinner />
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
    </>
  );
}

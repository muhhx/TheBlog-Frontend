import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCreatePost from "../../../hooks/useCreatePost";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../../features/auth/authSlice";
import usePanel from "../../../hooks/usePanel";

import * as C from "./styles";
import Spinner from "../../Spinner";

const ERR_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-warning-7.png&r=255&g=94&b=94";
const OK_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2017/png/iconmonstr-check-mark-15.png&r=13&g=122&b=13";
const CLOSE_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/7.2.0/png/iconmonstr-x-mark-lined.png&r=188&g=188&b=188";

export default function Create({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const { username } = useSelector(selectAuthState);
  const navigate = useNavigate();
  const { close } = usePanel();
  const [status, error, create] = useCreatePost();

  const [summary, setSummary] = useState("Resumo...");
  const [validSummary, setValidSummary] = useState(false);
  const [image, setImage] = useState("");
  const [validImage, setValidImage] = useState(false);

  useEffect(() => {
    setValidSummary(summary.length > 140 || !summary ? false : true);
  }, [summary]);

  useEffect(() => {
    setValidImage(!image ? false : true);
  }, [image]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    create({ title, summaryInput: summary, image, content });

    navigate(`/user/${username}`);
  };
  return (
    <C.Container>
      <C.Form onSubmit={handleSubmit}>
        <C.CloseContainer>
          <C.Close backgroundUrl={CLOSE_ICON} onClick={close} />
        </C.CloseContainer>

        {error ? <C.ApiError>{error}</C.ApiError> : ""}

        <C.Wrapper>
          <C.Header>{title}</C.Header>
          <C.Subtitle>{summary}</C.Subtitle>
          <C.ImagePreview backgroundUrl={image} id="preview" />
        </C.Wrapper>

        <C.InputContainer>
          <C.Label htmlFor="image">Image Link</C.Label>
          <C.InputHolder>
            <C.Input
              type="text"
              id="image"
              autoComplete="off"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </C.InputHolder>
        </C.InputContainer>

        <C.InputContainer>
          <C.Label htmlFor="summary">Summary</C.Label>
          <C.InputHolder>
            <C.Input
              type="text"
              id="summary"
              autoComplete="off"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              maxLength={140}
            />
            {!validSummary && summary ? (
              <C.Icon backgroundUrl={ERR_ICON} />
            ) : (
              ""
            )}
            {validSummary ? <C.Icon backgroundUrl={OK_ICON} /> : ""}
          </C.InputHolder>
          {validSummary || !summary ? "" : <C.Error>Summary inválido.</C.Error>}
        </C.InputContainer>
        <C.ButtonContainer>
          <C.Button
            disabled={
              !title ||
              !content ||
              !validImage ||
              !validSummary ||
              status === "loading"
            }
          >
            Publicar
            {status === "loading" ? <Spinner /> : ""}
          </C.Button>
        </C.ButtonContainer>
      </C.Form>
    </C.Container>
  );
}

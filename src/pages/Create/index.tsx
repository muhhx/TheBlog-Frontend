import React, { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import usePanel from "../../hooks/usePanel";
import * as C from "./styles";
import styles from "../../config/reactMarkdown.module.css";

export default function Create() {
  const { open } = usePanel();
  const [display, setDisplay] = useState<"editor" | "preview" | "realTime">(
    "editor"
  );

  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [content, setContent] = useState("");
  const [validContent, setValidContent] = useState(false);

  useEffect(() => {
    setValidTitle(title.length > 100 || !title ? false : true);
    setValidContent(!content ? false : true);
  }, [title, content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) return;

    open("create", { title, content });
  };

  return (
    <C.Form onSubmit={handleSubmit}>
      <C.ButtonContainer>
        <C.Button disabled={!validTitle || !validContent ? true : false}>
          Criar Post
        </C.Button>
        <C.OptionWrapper>
          <C.Option
            onClick={() => setDisplay("editor")}
            selected={display === "editor" ? true : false}
            onSubmit={() => {}}
          >
            Editor
          </C.Option>
          <C.Option
            onClick={() => setDisplay("preview")}
            selected={display === "preview" ? true : false}
            onSubmit={() => {}}
          >
            Preview
          </C.Option>
          <C.Option
            onClick={() => setDisplay("realTime")}
            selected={display === "realTime" ? true : false}
            onSubmit={() => {}}
          >
            Real Time
          </C.Option>
        </C.OptionWrapper>
      </C.ButtonContainer>

      <C.SpanHeader>
        <strong>Aviso:</strong>
        <ul style={{ marginLeft: "18px" }}>
          <li>
            Nós utilizamos Markdown para criar o conteúdo do post. Escreva seu
            markdown na aba "Editor", e veja o resultado na aba "Preview". A aba
            "Real Time" possibilita você ver as duas abas ao mesmo tempo.
          </li>
          <li>
            Após terminar o seu post, clique no botão "Criar Post", em azul.
          </li>
        </ul>
      </C.SpanHeader>

      <C.InputContainer>
        <C.Label htmlFor="title">Título</C.Label>
        <C.Input
          type="text"
          id="title"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
        />
      </C.InputContainer>

      <C.ContentContainer>
        <C.Label htmlFor="content">Conteúdo</C.Label>
        <C.Wrapper>
          <C.Editor
            onChange={(e) => setContent(e.target.value)}
            show={display === "preview" ? false : true}
          />
          <C.Preview show={display === "editor" ? false : true}>
            <ReactMarkdown
              children={content}
              className={styles.reactMarkdown}
              remarkPlugins={[remarkGfm]}
            />
          </C.Preview>
        </C.Wrapper>
      </C.ContentContainer>
    </C.Form>
  );
}

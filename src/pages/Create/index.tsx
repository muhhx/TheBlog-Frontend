import { useState } from "react";
import ReactMarkdown from "react-markdown";
import * as C from "./styles";

export default function Create() {
  const [content, setContent] = useState("");

  return (
    <C.Container>
      <h1>Criar post</h1>
      <div>Titulo</div>
      <div>Sumário</div>
      <div>Imagem</div>
      <div>Texto</div> O texto ja será escrito com preview
      <textarea onChange={(e) => setContent(e.target.value)}></textarea>
      <ReactMarkdown children={content} />
    </C.Container>
  );
}
// const { title, summaryInput, image, content } = req.body;

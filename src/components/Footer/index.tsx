import * as C from "./styles";

export default function Footer() {
  return (
    <C.Footer>
      <C.Container>
        <C.Span>The Blog. foi criado por Murilo Santos.</C.Span>
        <C.NavLink href="https://www.linkedin.com/in/muhhx/" target="_blank">
          LinkedIN
        </C.NavLink>
        <C.NavLink href="https://github.com/muhhx" target="_blank">
          Github
        </C.NavLink>
      </C.Container>
    </C.Footer>
  );
}

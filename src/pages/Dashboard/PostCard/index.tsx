import * as C from "./styles";
import arrow from "../../../assets/arrow.png";

interface IProps {
  image: string;
  summary: string;
  title: string;
}

export default function PostCard({ image, summary, title }: IProps) {
  return (
    <C.Container>
      <C.Image image={image}>
        <C.Fade />
      </C.Image>
      <C.Wrapper>
        <C.Information>
          tags
          <C.Title>{title}</C.Title>
          <C.Summary>{summary}</C.Summary>
        </C.Information>
        <C.Button>
          <C.ButtonSpan>Ler</C.ButtonSpan>
          <C.ButtonArrow image={arrow} />
        </C.Button>
      </C.Wrapper>
    </C.Container>
  );
}

//Created at
//Image
//Title
//summary

import ReactMarkdown from "react-markdown";

export default function Content({ content }: { content: string }) {
  return <ReactMarkdown children={content} />;
}

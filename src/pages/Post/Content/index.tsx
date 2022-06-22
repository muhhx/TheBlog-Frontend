import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../../config/reactMarkdown.module.css";

export default function Content({ content }: { content: string }) {
  return (
    <ReactMarkdown
      children={content}
      className={styles.reactMarkdown}
      remarkPlugins={[remarkGfm]}
    />
  );
}

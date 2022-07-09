import { useState } from "react";
import { selectPost } from "../../../features/post/postSlice";
import { useSelector } from "react-redux";
import useCreateComment from "../../../hooks/useCreateComment";
import IAuth from "../../../features/auth/authTypes";
import Spinner from "../../../components/Spinner";
import Comment from "./Comment";
import * as C from "./styles";

export default function Comments({ auth }: { auth: IAuth }) {
  const { comments, data } = useSelector(selectPost);
  const [status, error, createComment] = useCreateComment();
  const [commentary, setCommentary] = useState("");

  const handleCreateComment = () => {
    createComment({ comment: commentary, postId: data._id });
    setCommentary("");
  };

  return (
    <C.Container>
      <h1>Comentários</h1>

      {!auth.isAuth && <div>Faça o login para continuar</div>}

      {auth.isAuth && auth.picture && (
        <C.CommentContainer>
          <C.Profile image={auth.picture} />
          <C.Box>
            <C.TextArea
              placeholder="O que você achou desse post?"
              maxLength={500}
              onChange={(e) => setCommentary(e.target.value)}
              value={commentary}
            />
            <C.Button
              disabled={!commentary || status === "loading" ? true : false}
              onClick={handleCreateComment}
            >
              {status === "loading" ? <Spinner /> : "Comentar"}
            </C.Button>
          </C.Box>
        </C.CommentContainer>
      )}

      {comments.length === 0 && (
        <C.Span>
          Este post ainda não possui comentários. Seja o primeiro!
        </C.Span>
      )}

      <C.CommentWrapper>
        {comments.map((comment, key) => (
          <Comment
            key={key}
            comment={comment}
            isCurrentUser={auth.userId === comment.userData._id}
          />
        ))}
      </C.CommentWrapper>
    </C.Container>
  );
}

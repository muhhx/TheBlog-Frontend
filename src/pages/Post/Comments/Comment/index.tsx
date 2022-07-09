import { useState } from "react";
import { ICommentData } from "../../../../features/post/postTypes";
import useDeleteComment from "../../../../hooks/useDeleteComment";
import useUpdateComment from "../../../../hooks/useUpdateComment";
import WhiteSpinner from "../../../../components/WhiteSpinner";
import Spinner from "../../../../components/Spinner";
import * as C from "./styles";

const OPEN_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2013/png/iconmonstr-pen-3.png&r=197&g=197&b=197";
const CLOSE_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/7.2.0/png/iconmonstr-x-mark-lined.png&r=197&g=197&b=197";

export default function Comment({
  comment,
  isCurrentUser,
}: {
  comment: ICommentData;
  isCurrentUser: boolean;
}) {
  const [delStatus, delError, deleteComment] = useDeleteComment();
  const [upStatus, upError, updateComment] = useUpdateComment();
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleUpdateComment = () => {
    updateComment(comment.comment._id, newComment);
    setNewComment("");
    setIsOpen(false);
  };
  const handleDeleteComment = () => {
    deleteComment(comment.comment._id);
    setIsOpen(false);
  };

  return (
    <C.Container>
      <C.Wrapper>
        <C.User>
          <C.Picture image={comment.userData.picture} />

          <C.UserWrapper>
            <C.Name>
              <C.NameLink to={`/user/${comment.userData.username}`}>
                {comment.userData.name}
              </C.NameLink>
              <C.Data> - {comment.comment.createdAt}</C.Data>
            </C.Name>
            <C.Information>{comment.comment.comment}</C.Information>
          </C.UserWrapper>
        </C.User>
        {isCurrentUser && (
          <C.Edit
            image={isOpen ? CLOSE_ICON : OPEN_ICON}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </C.Wrapper>
      {isOpen && (
        <C.Box>
          <C.TextArea
            placeholder="O que você achou desse post?"
            maxLength={500}
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <C.ButtonWrapper>
            <C.DeleteButton
              disabled={delStatus === "loading" ? true : false}
              onClick={handleDeleteComment}
            >
              {delStatus === "loading" ? <WhiteSpinner /> : "Deletar"}
            </C.DeleteButton>
            <C.SubmitButton
              disabled={upStatus === "loading" ? true : false}
              onClick={handleUpdateComment}
            >
              {upStatus === "loading" ? <Spinner /> : "Salvar"}
            </C.SubmitButton>
          </C.ButtonWrapper>
        </C.Box>
      )}
    </C.Container>
  );
}

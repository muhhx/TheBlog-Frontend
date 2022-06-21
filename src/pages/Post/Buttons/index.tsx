import useUpvote from "../../../hooks/useUpvote";
import useFavorite from "../../../hooks/useFavorite";

import Spinner from "../../../components/Spinner";
import WhiteSpinner from "../../../components/WhiteSpinner";
import * as C from "./styles";

const SAVE_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2013/png/iconmonstr-bookmark-4.png&r=255&g=255&b=255";
const SAVED_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2013/png/iconmonstr-bookmark-3.png&r=255&g=255&b=255";
const UPVOTE_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2013/png/iconmonstr-thumb-10.png&r=50&g=50&b=50";
const UPVOTED_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2013/png/iconmonstr-thumb-9.png&r=50&g=50&b=50";

export default function Buttons({
  isLiked,
  isSaved,
  upvotesCount,
  postId,
}: {
  isLiked: boolean;
  isSaved: boolean;
  upvotesCount: number;
  postId: string;
}) {
  const [upvoteStatus, upvoteError, handleUpvote] = useUpvote();
  const [favoriteStatus, favoriteError, handleFavorite] = useFavorite();

  return (
    <C.Buttons>
      <C.Upvote onClick={() => handleUpvote(postId)}>
        {upvoteStatus === "loading" && <Spinner />}

        {upvoteStatus !== "loading" && (
          <>
            <C.Icon image={!isLiked ? UPVOTE_ICON : UPVOTED_ICON} />
            <C.UpvoteDivisor>|</C.UpvoteDivisor>
            <span>{upvotesCount}</span>
          </>
        )}
      </C.Upvote>
      <C.Save onClick={() => handleFavorite(postId)}>
        {favoriteStatus === "loading" && <WhiteSpinner />}

        {favoriteStatus !== "loading" && (
          <>
            <C.Icon image={!isSaved ? SAVE_ICON : SAVED_ICON} />
            <C.SaveDivisor>|</C.SaveDivisor>
            <span>{!isSaved ? "Favoritar" : "Remover"}</span>
          </>
        )}
      </C.Save>
    </C.Buttons>
  );
}

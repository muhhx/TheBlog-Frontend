import Spinner from "../../../components/Spinner";
import useUnfollow from "../../../hooks/useUnfollow";
import useFollow from "../../../hooks/useFollow";
import { useNavigate } from "react-router-dom";
import * as C from "./styles";

interface IProps {
  isBeingFollowed: boolean;
  isCurrentUser: boolean;
  isAuth: boolean;
  id: string;
}

const FOLLOW_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/7.0.0/png/iconmonstr-plus-circle-filled.png&r=255&g=255&b=255";
const EDIT_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-edit-10.png&r=255&g=255&b=255";

export default function Buttons({
  isBeingFollowed,
  isCurrentUser,
  isAuth,
  id,
}: IProps) {
  const navigate = useNavigate();
  const [unfollowStatus, unfollowError, unfollow] = useUnfollow();
  const [followStatus, followError, follow] = useFollow();

  const handleUnfollow = () => {
    unfollow(id);
  };

  const handleFollow = () => {
    if (!isAuth) navigate("/login");
    else follow(id);
  };

  const handleUser = () => {
    navigate("/editor");
  };

  return (
    <>
      {isBeingFollowed && (
        <C.Unfollow onClick={handleUnfollow}>
          {unfollowStatus === "loading" && <Spinner />}
        </C.Unfollow>
      )}

      {!isBeingFollowed && !isCurrentUser && (
        <C.Button onClick={handleFollow}>
          <span>Seguir</span>
          <C.Icon image={FOLLOW_ICON} />
          {followStatus === "loading" && <Spinner />}
        </C.Button>
      )}

      {!isBeingFollowed && isCurrentUser && (
        <C.Button onClick={handleUser}>
          <span>Editar Perfil</span>
          <C.Icon image={EDIT_ICON} />
        </C.Button>
      )}
    </>
  );
}

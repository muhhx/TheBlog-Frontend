import { useSelector } from "react-redux";
import { selectUserFollowing } from "../../../features/user/userSlice";
import usePanel from "../../../hooks/usePanel";

import Profile from "./Profile";
import * as C from "./styles";

const CLOSE_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/7.2.0/png/iconmonstr-x-mark-lined.png&r=188&g=188&b=188";

export default function Following() {
  const { close } = usePanel();
  const following = useSelector(selectUserFollowing);

  return (
    <C.Container>
      <C.Wrapper>
        <C.CloseContainer>
          <C.Header>Seguidores</C.Header>
          <C.Close image={CLOSE_ICON} onClick={close} />
        </C.CloseContainer>
        <C.FollowingContainer>
          {following.map((follower) => (
            <Profile key={follower._id} userInfo={follower} />
          ))}
        </C.FollowingContainer>
      </C.Wrapper>
    </C.Container>
  );
}

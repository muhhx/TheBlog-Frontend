import { useSelector } from "react-redux";
import { selectUserFollowers } from "../../features/user/userSlice";
import usePanel from "../../hooks/usePanel";

import Profile from "./Profile";
import * as C from "./styles";

const CLOSE_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/7.2.0/png/iconmonstr-x-mark-lined.png&r=188&g=188&b=188";

export default function Following() {
  const { close } = usePanel();
  const followers = useSelector(selectUserFollowers);

  return (
    <C.Container>
      <C.Wrapper>
        <C.CloseContainer>
          <C.Header>Seguidores</C.Header>
          <C.Close image={CLOSE_ICON} onClick={close} />
        </C.CloseContainer>
        <C.FollowersContainer>
          {followers.map((follower) => (
            <Profile key={follower._id} userInfo={follower} />
          ))}
        </C.FollowersContainer>
      </C.Wrapper>
    </C.Container>
  );
}

import useUnfollow from "../../../../hooks/useUnfollow";
import { IFollower } from "../../../../features/user/userTypes";
import * as C from "./styles";
import Spinner from "../../../Spinner";

export default function Profile({ userInfo }: { userInfo: IFollower }) {
  const [status, error, unfollow] = useUnfollow();

  return (
    <C.Container>
      <C.Picture image={userInfo.picture} />
      <C.Information>
        <C.Name>{userInfo.name}</C.Name>
        <C.Username>{userInfo.username}</C.Username>
        {/* <C.Unfollow
          disabled={status === "loading" ? true : false}
          onClick={() => unfollow(userInfo._id)}
        >
          {status === "loading" && <Spinner />}
        </C.Unfollow> */}
      </C.Information>
    </C.Container>
  );
}

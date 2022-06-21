import { IFollower } from "../../../../features/user/userTypes";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../../../features/auth/authSlice";
import * as C from "./styles";

export default function Profile({ userInfo }: { userInfo: IFollower }) {
  const { userId } = useSelector(selectAuthState);

  return (
    <C.Container>
      <C.Picture image={userInfo.picture} />
      <C.Information>
        <C.Name>
          <C.NavLink to={`/user/${userInfo.username}`}>
            {userInfo.name}
          </C.NavLink>
        </C.Name>
        <C.Username>{userInfo.username}</C.Username>
        {userId !== userInfo._id && (
          <C.Button>
            <C.NavLink to={`/user/${userInfo.username}`}>
              Ir para perfil
            </C.NavLink>
          </C.Button>
        )}
      </C.Information>
    </C.Container>
  );
}

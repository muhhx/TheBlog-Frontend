import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";

export default function Header() {
  const { isAuth, status, name } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <header>
      <div>Logo</div>
      <div>Searchbar</div>
      {isAuth ? <div>Menu do {name}</div> : <div>Login/Signup</div>}
    </header>
  );
}

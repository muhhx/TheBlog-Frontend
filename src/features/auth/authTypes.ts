export default interface IAuth {
  isAuth: boolean;
  name: null | string;
  username: null | string;
  userId: null | string;
  status: "idle" | "pending" | "success" | "failure";
}

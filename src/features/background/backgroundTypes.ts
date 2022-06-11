export default interface IBackground {
  image: string | null;
  status: "idle" | "pending" | "success" | "failure";
}

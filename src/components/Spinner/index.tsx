import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";

export default function Spinner() {
  return (
    <Oval height="15px" width="15px" color="#1473e6" ariaLabel="loading" />
  );
}

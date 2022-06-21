import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";

export default function WhiteSpinner() {
  return <Oval height="15px" width="15px" color="#fff" ariaLabel="loading" />;
}

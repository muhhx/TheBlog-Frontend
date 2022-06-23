import { useState } from "react";
import * as C from "./styles";

interface IProps {
  label: string;
  inputType: string;
  max?: number;
  state: string;
  validState: boolean | null;
  setState: (value: React.SetStateAction<string>) => void;
  error: string;
}

const ERR_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-warning-7.png&r=255&g=94&b=94";
const OK_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2017/png/iconmonstr-check-mark-15.png&r=13&g=122&b=13";
const SHOW_ICON =
  "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-eye-8.png&r=116&g=116&b=116";

export default function Input({
  label,
  inputType,
  state,
  validState,
  setState,
  error,
  max,
}: IProps) {
  const [displayPassword, setDisplayPassword] = useState(false);

  return (
    <C.InputContainer>
      <C.Label htmlFor={state}>{label}</C.Label>
      <C.InputHolder>
        <C.Input
          type={!displayPassword ? inputType : "text"}
          id={String(Math.random())}
          autoComplete="off"
          value={state}
          onChange={(e) => setState(e.target.value)}
          maxLength={max || 300}
        />
        {validState !== null && !validState && state && (
          <C.Icon image={ERR_ICON} />
        )}
        {validState !== null && validState && state && (
          <C.Icon image={OK_ICON} />
        )}

        {inputType === "password" && (
          <C.ShowPassword
            image={SHOW_ICON}
            onClick={() =>
              setDisplayPassword(displayPassword === false ? true : false)
            }
          />
        )}
      </C.InputHolder>
      {validState !== null && !validState && state && (
        <C.Error>{error}</C.Error>
      )}
    </C.InputContainer>
  );
}

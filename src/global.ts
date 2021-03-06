import { createGlobalStyle } from "styled-components";

interface IProps {
  displayPanel: boolean;
}

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    html {
        font-size: 14px;
        font-family: "Poppins", sans-serif;
    }

    body {
        overflow: ${(props: IProps) =>
          !props.displayPanel ? "initial" : "hidden"};
    }
    
`;

export default GlobalStyle;

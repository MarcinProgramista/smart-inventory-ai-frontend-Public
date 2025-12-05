import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: "Inter", sans-serif;
    background: transparent;   /* 🔥 najważniejsza zmiana */
    overflow-x: hidden;
    color: white;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";
import bg from "../assets/tapeta.png";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;   /* 🔥 FIX — pozwala na scroll */
  }

  html, body {
    font-family: "Inter", sans-serif;
    background: none;
    min-height: 100vh;
    color: white;
    overflow-x: hidden;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    pointer-events: none;
    will-change: transform;
  }
`;

export default GlobalStyle;

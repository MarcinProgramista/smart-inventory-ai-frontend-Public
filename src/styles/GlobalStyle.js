// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";
import bg from "../assets/tapeta.png";

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: "Inter", sans-serif;
    background: none;
    min-height: 100vh;
    overflow-x: hidden;
    color: white;
    position: relative;   /* 👈 BYŁO BRAK! */
  }

  body::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;          /* teraz działa prawidłowo */
    background-image: url(${bg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
  }
`;

export default GlobalStyle;

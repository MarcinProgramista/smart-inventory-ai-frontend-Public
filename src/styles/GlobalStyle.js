import { createGlobalStyle } from "styled-components";
import bg from "../assets/tapeta.png";
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

html, body {
  font-family: "Inter", sans-serif;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;      /* obraz przykrywa całość */
  background-position: center;
  background-attachment: fixed; /* 🔥 obraz zostaje na miejscu */
  min-height: 100vh;           /* tło wys. min. 100% ekranu */
  color: white;
  overflow-x: hidden;
}

`;

export default GlobalStyle;

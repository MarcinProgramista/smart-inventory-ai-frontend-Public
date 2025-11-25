// src/components/layout/BackgroundImage.jsx
import styled from "styled-components";
import bg from "../../assets/startpage.png";

const BackgroundImage = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;

  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  filter: brightness(0.65);
  z-index: -3;
`;

export default BackgroundImage;

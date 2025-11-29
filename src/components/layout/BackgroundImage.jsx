import styled from "styled-components";
import bg from "../../assets/startpage.png";

const BackgroundImage = styled.div`
  position: fixed;
  inset: 0;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -3;
`;

export default BackgroundImage;

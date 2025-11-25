import styled, { createGlobalStyle } from "styled-components";
import bg from "../assets/startpage.png";

/* RESET */
const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body {
    font-family: "Inter", sans-serif;
    background: #000;
    overflow: hidden;
    color: white;
  }
`;

export default function StartPage() {
  return (
    <>
      <GlobalStyle />

      {/* TWOJE TLO - BEZ ZMIAN */}
      <BackgroundImage />
      <DarkLayer />

      <GlowOverlay />

      <Center>
        <Title>SmartInventoryAI</Title>

        <Subtitle>AI-powered inventory & warehouse management system.</Subtitle>

        <FeatureList>
          <li>✔ Track inventory in real time</li>
          <li>✔ Predict shortages with AI</li>
          <li>✔ Generate smart reports</li>
        </FeatureList>

        <ButtonRow>
          <Button>Log In</Button>
          <Button secondary>Register</Button>
        </ButtonRow>
      </Center>
    </>
  );
}

/* --------------------- STYLE ----------------------- */

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

const DarkLayer = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 5, 15, 0.25);
  z-index: -2;
`;

const GlowOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: radial-gradient(
    circle at 60% 25%,
    rgba(0, 200, 255, 0.22),
    transparent 60%
  );
  z-index: -1;
`;

const Center = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 480px;

  padding: 40px 45px;
  text-align: center;

  background: rgba(0, 20, 40, 0.22);
  backdrop-filter: blur(16px);

  border: 1px solid rgba(0, 200, 255, 0.25);
  border-radius: 20px;

  box-shadow: 0 0 35px rgba(0, 180, 255, 0.25),
    inset 0 0 28px rgba(0, 160, 255, 0.18);
`;

const Title = styled.h1`
  font-size: 42px;
  margin-bottom: 10px;
  font-weight: 800;
  color: #4dddf7;

  text-shadow: 0 0 25px #00cfff, 0 0 45px #009dff;
`;

const Subtitle = styled.p`
  font-size: 15px;
  opacity: 0.9;
  margin-bottom: 25px;
`;

const FeatureList = styled.ul`
  list-style: none;
  color: #bfeaff;
  margin-bottom: 30px;
  line-height: 1.8;

  text-shadow: 0 0 12px rgba(0, 200, 255, 0.4);
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 18px;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "secondary",
})`
  flex: 1;
  padding: 12px 18px;
  border-radius: 10px;

  border: 1px solid rgba(0, 200, 255, 0.45);
  background: ${(p) =>
    p.secondary ? "rgba(0,0,0,0.3)" : "rgba(0,170,255,0.25)"};

  color: #9deaff;
  cursor: pointer;

  text-shadow: 0 0 6px rgba(0, 200, 255, 0.5);

  transition: 0.25s;

  &:hover {
    background: rgba(0, 180, 255, 0.55);
    box-shadow: 0 0 22px #00baff;
  }
`;

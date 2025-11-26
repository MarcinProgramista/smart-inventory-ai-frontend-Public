import styled from "styled-components";
import { Link } from "react-router-dom";
import BackgroundImage from "../components/layout/BackgroundImage";
import DarkLayer from "../components/layout/DarkLayer";
import GlowOverlay from "../components/layout/GlowOverlay";
import StartPageCard from "../components/ui/StartPageCard";

export default function StartPage() {
  return (
    <>
      <BackgroundImage />
      <DarkLayer />
      <GlowOverlay />

      <StartPageCard>
        <Title>SmartInventoryAI</Title>

        <Subtitle>AI-powered inventory & warehouse management system.</Subtitle>

        <FeatureList>
          <li>✔ Track inventory in real time</li>
          <li>✔ Predict shortages with AI</li>
          <li>✔ Generate smart reports</li>
        </FeatureList>

        <ButtonRow>
          <Button>Log In</Button>
          <StyledLink to="/register">
            <Button secondary>Register</Button>
          </StyledLink>
        </ButtonRow>
      </StartPageCard>
    </>
  );
}

/* ---------------- STYLES ---------------- */
const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 42px;
  margin-bottom: 8px;
  font-weight: 800;
  color: #4dddf7;
  text-shadow: 0 0 18px rgba(0, 200, 255, 0.15);
`;

const Subtitle = styled.p`
  font-size: 15px;
  opacity: 0.95;
  margin-bottom: 20px;
  color: #dff8ff;
`;

const FeatureList = styled.ul`
  list-style: none;
  color: #bfeaff;
  margin: 0 0 26px 0;
  padding: 0;
  line-height: 1.8;
  text-shadow: 0 0 8px rgba(0, 200, 255, 0.12);
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 14px;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "secondary",
})`
  flex: 1;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(0, 200, 255, 0.35);
  background: ${(p) =>
    p.secondary ? "rgba(0,0,0,0.28)" : "rgba(0,170,255,0.18)"};
  color: #9deaff;
  cursor: pointer;
  text-shadow: 0 0 6px rgba(0, 200, 255, 0.25);
  transition: 0.18s ease-in-out;

  &:hover {
    background: rgba(0, 180, 255, 0.45);
    box-shadow: 0 6px 18px rgba(0, 140, 255, 0.12);
  }
`;

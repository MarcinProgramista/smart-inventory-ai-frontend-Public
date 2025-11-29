import BackgroundImage from "../components/layout/BackgroundImage";
import DarkLayer from "../components/layout/DarkLayer";
import GlowOverlay from "../components/layout/GlowOverlay";
import StartPageCard from "../components/ui/StartPageCard";
import StyledLink from "../components/ui/buttons/StyledLink";
import Button from "../components/ui/buttons/Button";
import Title from "../components/ui/typography/Title";
import Subtitle from "../components/ui/typography/Subtitle";
import FeatureList from "../components/ui/lists/FeatureList";
import ButtonRow from "../components/layout/ButtonRow";
import Layout from "../components/layout/Layout";

export default function StartPage() {
  return (
    <>
      {/* <Layout /> */}
      <StartPageCard>
        <Title>SmartInventoryAI</Title>

        <Subtitle>AI-powered inventory & warehouse management system.</Subtitle>

        <FeatureList>
          <li>✔ Track inventory in real time</li>
          <li>✔ Predict shortages with AI</li>
          <li>✔ Generate smart reports</li>
        </FeatureList>

        <ButtonRow>
          <StyledLink to="/login">
            <Button>Log In</Button>
          </StyledLink>

          <StyledLink to="/register">
            <Button secondary>Register</Button>
          </StyledLink>
        </ButtonRow>
      </StartPageCard>
    </>
  );
}

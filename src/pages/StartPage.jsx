import styled from "styled-components";
import bg from "../assets/smart-inventory-management-system.jpg";

export default function StartPage() {
  return (
    <Wrapper>
      <BackgroundImage src={bg} />
      <BackgroundOverlay />

      <Content>
        <Left>
          <Title>SmartInventoryAI</Title>
          <Subtitle>AI-powered inventory & warehouse management system.</Subtitle>

          <FeatureList>
            <li>✔ Track inventory in real time</li>
            <li>✔ Predict shortages with AI</li>
            <li>✔ Generate smart reports</li>
          </FeatureList>
        </Left>

        <Right>
          <Card>
            <CardTitle>Welcome</CardTitle>
            <CardText>Manage your warehouse with next-generation AI tools.</CardText>

            <ButtonRow>
              <Button>Log In</Button>
              <Button secondary>Register</Button>
            </ButtonRow>
          </Card>
        </Right>
      </Content>
    </Wrapper>
  );
}

/* ---------------- STYLES ---------------- */

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  padding: 0;
`;

const BackgroundImage = styled.img`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(8px) brightness(0.45);
  z-index: -2;
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(3px);
  z-index: -1;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 60px;
  gap: 40px;
  flex-wrap: wrap;
`;

const Left = styled.div`
  color: #dff9ff;
  max-width: 450px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #4dddf7;
  text-shadow: 0 0 18px #4dddf7;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  opacity: 0.85;
  margin-bottom: 20px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding-left: 0;
  font-size: 16px;
  line-height: 1.8;
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const Card = styled.div`
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 16px;
  padding: 40px;
  max-width: 380px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.15);
`;

const CardTitle = styled.h2`
  font-size: 26px;
  color: #4dddf7;
  text-shadow: 0 0 12px #4dddf7;
  margin-bottom: 15px;
`;

const CardText = styled.p`
color: #4dddf7;
  text-shadow: 0 0 12px #4dddf7;

  font-size: 15px;
  margin-bottom: 25px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 12px 22px;
  border-radius: 8px;
  border: 1px solid #4dddf7;
  background: ${(p) => (p.secondary ? "transparent" : "rgba(0,255,255,0.15)")};
  color: #4dddf7;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s;

  &:hover {
    background: rgba(0, 255, 255, 0.25);
    box-shadow: 0 0 15px #4dddf7;
  }
`;

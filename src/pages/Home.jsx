import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #04080f;
  color: #bce9ff;
  font-family: "Inter", sans-serif;

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    padding-top: 60px;
  }
`;

const Left = styled.div`
  flex: 1;
  padding: 80px;
`;

const Right = styled.div`
  flex: 1;
  padding: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #4de0ff;
  text-shadow: 0 0 20px #0099cc;
`;

const Subtitle = styled.p`
  margin-top: 10px;
  font-size: 20px;
  max-width: 500px;
  opacity: 0.9;
`;

const Features = styled.ul`
  margin-top: 40px;
  list-style: none;
  padding: 0;
  font-size: 18px;
  line-height: 1.8;
  color: #9deaff;
  text-shadow: 0 0 8px #0077aa;
`;

const NeonCard = styled.div`
  background: rgba(0, 20, 40, 0.6);
  padding: 40px;
  width: 350px;
  border-radius: 16px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 180, 255, 0.3);
  box-shadow: 0 0 20px #002b40, 0 0 60px #001f33;

  h2 {
    color: #4de0ff;
    font-size: 28px;
    text-shadow: 0 0 12px #0077aa;
  }

  p {
    margin-top: 10px;
    opacity: 0.8;
  }
`;

const NeonButton = styled(Link)`
  text-align: center;
  padding: 14px 0;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s ease;
  letter-spacing: 0.5px;
  width: 100%;

  &.filled {
    background: #00c8ff;
    color: black;
    box-shadow: 0 0 12px #00c8ff, 0 0 30px #0086b3;
  }

  &.filled:hover {
    box-shadow: 0 0 20px #00e0ff, 0 0 50px #00aaff;
    transform: translateY(-2px);
  }

  &.outline {
    border: 2px solid #00c8ff;
    color: #00c8ff;
  }

  &.outline:hover {
    background: rgba(0, 200, 255, 0.15);
    box-shadow: 0 0 20px #0099cc;
    transform: translateY(-2px);
  }
`;

export default function Home() {
  return (
    <Container className="container-fluid">
      <Left className="col-12 col-md-6">
        <Title>SmartInventoryAI</Title>
        <Subtitle>AI-powered inventory & warehouse management system.</Subtitle>

        <Features>
          <li>✔ Track inventory in real time</li>
          <li>✔ Predict shortages with AI</li>
          <li>✔ Generate smart reports</li>
        </Features>
      </Left>

      <Right className="col-12 col-md-6">
        <NeonCard>
          <h2>Welcome</h2>
          <p>Manage your warehouse with next-generation AI tools.</p>

          <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
            <NeonButton to="/login" className="filled">
              Log In
            </NeonButton>

            <NeonButton to="/register" className="outline">
              Register
            </NeonButton>
          </div>
        </NeonCard>
      </Right>
    </Container>
  );
}

// components/ui/NeonCardBright.jsx
import styled from "styled-components";

const NeonCardBright = styled.div`
  background: rgba(0, 40, 70, 0.55);
  backdrop-filter: blur(14px);
  border-radius: 24px;
  padding: 2rem;
  color: #9deaff;

  box-shadow:
    0 0 35px rgba(0, 200, 255, 0.45),
    0 0 75px rgba(0, 200, 255, 0.25),
    inset 0 0 25px rgba(0, 200, 255, 0.35);

  border: 2px solid rgba(0, 200, 255, 0.55);

  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow:
      0 0 45px rgba(0, 200, 255, 0.65),
      0 0 90px rgba(0, 200, 255, 0.35),
      inset 0 0 30px rgba(0, 200, 255, 0.55);
  }
`;

export default NeonCardBright;

import styled from "styled-components";

const GlassCard = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 35px;

  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px);

  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);

  box-shadow: 0 0 18px rgba(255, 255, 255, 0.1);

  color: #e9f4ff;
`;

export default GlassCard;

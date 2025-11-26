import styled from "styled-components";

const NeonCard = styled.div`
  width: 100%;
  max-width: 520px;
  padding: 45px;

  background: rgba(0, 30, 60, 0.25);
  backdrop-filter: blur(18px);

  border: 1px solid rgba(0, 200, 255, 0.25);
  border-radius: 20px;

  box-shadow: 0 0 35px rgba(0, 180, 255, 0.35),
    inset 0 0 30px rgba(0, 150, 255, 0.2);

  color: #dff8ff;
`;

export default NeonCard;

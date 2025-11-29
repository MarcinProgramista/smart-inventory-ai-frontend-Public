import styled from "styled-components";

const StartPageCard = styled.div`
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 480px;
  padding: 40px 45px;
  text-align: center;

  background: rgba(0, 20, 40, 0.22);
  backdrop-filter: blur(12px);

  border: 1px solid rgba(0, 200, 255, 0.18);
  border-radius: 18px;

  box-shadow: 0 0 35px rgba(0, 180, 255, 0.12),
    inset 0 0 18px rgba(0, 160, 255, 0.06);

  z-index: 2; /* <── POPRAWKA */
  position: absolute;
`;

export default StartPageCard;

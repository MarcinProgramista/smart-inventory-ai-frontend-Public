import styled from "styled-components";

const NeonCard = styled.div`
  position: absolute;
  top: 52%;
  left: 20%;
  transform: translate(-50%, -50%);

  width: 520px;
  padding: 55px 55px;

  background: rgba(0, 30, 60, 0.25);
  backdrop-filter: blur(18px);

  border: 1px solid rgba(0, 200, 255, 0.25);
  border-radius: 20px;

  box-shadow:
    0 0 35px rgba(0, 180, 255, 0.3),
    inset 0 0 30px rgba(0, 150, 255, 0.2);

  color: #dff8ff;
`;

export default NeonCard;

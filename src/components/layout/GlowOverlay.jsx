import styled from "styled-components";

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

export default GlowOverlay;

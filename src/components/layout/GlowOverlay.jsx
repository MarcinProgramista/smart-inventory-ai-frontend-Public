import styled from "styled-components";

const GlowOverlay = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at center,
    rgba(6, 200, 255, 0.06),
    transparent 30%
  );
  z-index: -3; /* może 1 albo 1.5 */
`;
export default GlowOverlay;

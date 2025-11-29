import BackgroundImage from "./BackgroundImage";
import DarkLayer from "./DarkLayer";
import GlowOverlay from "./GlowOverlay";
import styled from "styled-components";
const LayoutWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1; /* albo 0, jeśli twoje karty mają większy */
`;
export default function Layout() {
  return (
    <LayoutWrapper>
      <BackgroundImage />
      <DarkLayer />
      <GlowOverlay />
    </LayoutWrapper>
  );
}

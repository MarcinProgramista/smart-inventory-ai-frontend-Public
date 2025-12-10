import styled from "styled-components";
import {
  LayoutDashboard,
  BrainCircuit,
  Zap,
  Activity as ActivityIcon,
  BellRing,
  BarChart3,
  LineChart,
} from "lucide-react";

/* ===== HOLO / 3D NEON NAVIGATION ===== */
const NavWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

/* === HOLOGRAFICZNY NEON BUTTON === */
const NavButton = styled.button`
  padding: 0.8rem 1.6rem;
  border-radius: 16px;

  background: rgba(0, 60, 105, 0.25); /* jasne, futurystyczne szkło */
  border: 1px solid rgba(0, 220, 255, 0.7);
  color: #9deaff;

  font-size: 1rem;
  font-weight: 600;

  display: flex;
  align-items: center;
  gap: 0.6rem;

  cursor: pointer;
  transition: 0.25s ease;
  backdrop-filter: blur(12px) saturate(160%);

  /* Neon HOLO glow */
  box-shadow:
    0 0 14px rgba(0, 200, 255, 0.55),
    inset 0 0 14px rgba(0, 200, 255, 0.25),
    0 6px 22px rgba(0, 200, 255, 0.35); /* głębia 3D */

  /* efekt holograficznego rozszczepienia koloru */
  text-shadow:
    0 0 6px rgba(0, 200, 255, 0.6),
    0 0 12px rgba(0, 140, 255, 0.25);

  transform: perspective(900px) translateZ(0px);

  svg {
    width: 20px;
    height: 20px;
    stroke: #9deaff;
    filter: drop-shadow(0 0 6px rgba(0, 200, 255, 0.9));
  }

  &:hover {
    transform: perspective(900px) translateZ(14px);

    background: rgba(0, 80, 130, 0.32);
    border-color: #00eaff;

    box-shadow:
      0 0 22px rgba(0, 240, 255, 0.95),
      inset 0 0 18px rgba(0, 200, 255, 0.35),
      0 10px 28px rgba(0, 200, 255, 0.45);
  }

  &:active {
    transform: perspective(900px) translateZ(8px);
    box-shadow:
      0 0 14px rgba(0, 180, 255, 0.7),
      inset 0 0 12px rgba(0, 180, 255, 0.3);
  }
`;

export default function SectionNavigation() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <NavWrapper>
      <NavButton onClick={() => scrollTo("summary")}>
        <LayoutDashboard /> Summary
      </NavButton>

      <NavButton onClick={() => scrollTo("ai-insights")}>
        <BrainCircuit /> AI Insights
      </NavButton>

      <NavButton onClick={() => scrollTo("quick-actions")}>
        <Zap /> Quick Actions
      </NavButton>

      <NavButton onClick={() => scrollTo("activity")}>
        <ActivityIcon /> Activity
      </NavButton>

      <NavButton onClick={() => scrollTo("alerts")}>
        <BellRing /> Alerts
      </NavButton>

      <NavButton onClick={() => scrollTo("charts")}>
        <BarChart3 /> Charts
      </NavButton>

      <NavButton onClick={() => scrollTo("forecast")}>
        <LineChart /> AI Forecast
      </NavButton>
    </NavWrapper>
  );
}

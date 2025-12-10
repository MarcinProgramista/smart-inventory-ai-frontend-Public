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

const NavWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

/* 🔥 NEONOWY PRZYCISK — wygląd spójny z loginem i modalem */
const NavButton = styled.button`
  padding: 0.7rem 1.4rem;
  border-radius: 14px;

  background: rgba(0, 30, 50, 0.45);
  border: 1px solid rgba(0, 200, 255, 0.6);
  color: #9deaff;

  font-size: 1rem;
  font-weight: 500;

  display: flex;
  align-items: center;
  gap: 0.6rem;

  cursor: pointer;
  transition: 0.25s ease;
  backdrop-filter: blur(8px);

  /* NEON glow */
  box-shadow:
    0 0 12px rgba(0, 200, 255, 0.45),
    inset 0 0 10px rgba(0, 200, 255, 0.2);

  svg {
    width: 20px;
    height: 20px;
    stroke: #9deaff;
    filter: drop-shadow(0 0 4px rgba(0, 200, 255, 0.8));
  }

  &:hover {
    background: rgba(0, 40, 70, 0.65);
    transform: translateY(-3px);
    box-shadow:
      0 0 18px rgba(0, 200, 255, 0.8),
      inset 0 0 14px rgba(0, 200, 255, 0.35);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow:
      0 0 10px rgba(0, 150, 255, 0.6),
      inset 0 0 8px rgba(0, 150, 255, 0.25);
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

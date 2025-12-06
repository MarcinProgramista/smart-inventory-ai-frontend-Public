import styled from "styled-components";
import {
  LayoutDashboard,
  BrainCircuit,
  Zap,
  Activity as ActivityIcon,
  BellRing,
  BarChart3,
  LineChart, // ⭐ NOWA IKONA
} from "lucide-react";

const NavWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NavButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid #9deaff;
  color: #9deaff;
  cursor: pointer;
  transition: 0.2s ease;
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  &:hover {
    background: rgba(0, 0, 0, 0.55);
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
    stroke: #9deaff;
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

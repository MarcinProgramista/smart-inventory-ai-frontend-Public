import styled from "styled-components";

const NavWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NavButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid #9deaff;
  color: #9deaff;
  cursor: pointer;
  transition: 0.2s ease;
  backdrop-filter: blur(6px);

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    transform: translateY(-2px);
  }
`;

export default function SectionNavigation() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <NavWrapper>
      <NavButton onClick={() => scrollTo("summary")}>Summary</NavButton>
      <NavButton onClick={() => scrollTo("ai-insights")}>AI Insights</NavButton>
      <NavButton onClick={() => scrollTo("quick-actions")}>
        Quick Actions
      </NavButton>
      <NavButton onClick={() => scrollTo("activity")}>Activity</NavButton>
      <NavButton onClick={() => scrollTo("alerts")}>Alerts</NavButton>
      <NavButton onClick={() => scrollTo("charts")}>Charts</NavButton>
    </NavWrapper>
  );
}

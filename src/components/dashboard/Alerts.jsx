import styled from "styled-components";

const AlertsWrapper = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #9deaff;
`;

const Title = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #9deaff;
`;

const AlertList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const AlertItem = styled.li`
  margin: 0.7rem 0;
  padding-left: 0.5rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  opacity: 0.95;

  &.critical::before {
    content: "🔴";
  }

  &.warning::before {
    content: "🟠";
  }
`;

export default function Alerts() {
  return (
    <AlertsWrapper>
      <Title>Alerts ⚠️</Title>

      <AlertList>
        <AlertItem className="critical">LED Bulbs — Only 3 left</AlertItem>
        <AlertItem className="warning">USB Cables — Only 12 left</AlertItem>
        <AlertItem className="critical">
          Cement Bags — Below minimum stock
        </AlertItem>
      </AlertList>
    </AlertsWrapper>
  );
}

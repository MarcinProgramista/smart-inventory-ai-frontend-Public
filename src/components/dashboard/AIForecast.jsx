import styled from "styled-components";

const ForecastWrapper = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #9deaff;
`;

const Title = styled.h2`
  margin: 0 0 1.5rem 0;
  font-size: 1.6rem;
  color: #9deaff;
`;

const ForecastList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ForecastItem = styled.li`
  margin: 0.7rem 0;
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
  &.attention::before {
    content: "🟡";
  }
  &.stable::before {
    content: "🟢";
  }
`;

export default function AIForecast() {
  return (
    <ForecastWrapper>
      <Title>AI Forecast 🔮</Title>

      <ForecastList>
        <ForecastItem className="critical">
          LED Bulbs — runs out in 2 days
        </ForecastItem>
        <ForecastItem className="warning">
          USB Cables — runs out in 5 days
        </ForecastItem>
        <ForecastItem className="attention">
          Printer Ink — runs out in 9 days
        </ForecastItem>
        <ForecastItem className="stable">Office Paper — stable</ForecastItem>
      </ForecastList>
    </ForecastWrapper>
  );
}

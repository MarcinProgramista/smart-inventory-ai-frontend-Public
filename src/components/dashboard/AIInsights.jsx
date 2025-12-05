import styled from "styled-components";

const InsightsWrapper = styled.div`
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

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin: 0.5rem 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.9;

  &::before {
    content: "•";
    color: #00c6ff;
    font-size: 1.5rem;
    line-height: 1rem;
  }
`;

export default function AIInsights() {
  return (
    <InsightsWrapper>
      <Title>AI Insights 🤖</Title>

      <List>
        <ListItem>Item A may run out in 3 days</ListItem>
        <ListItem>5 items are below minimum stock</ListItem>
        <ListItem>Category Electronics shows rising demand</ListItem>
      </List>
    </InsightsWrapper>
  );
}

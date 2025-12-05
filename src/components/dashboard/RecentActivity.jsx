import styled from "styled-components";

const ActivityWrapper = styled.div`
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

const ActivityList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ActivityItem = styled.li`
  margin: 0.6rem 0;
  padding-left: 0.5rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  opacity: 0.9;

  &::before {
    content: "•";
    color: #00c6ff;
    font-size: 1.5rem;
  }
`;

export default function RecentActivity() {
  return (
    <ActivityWrapper>
      <Title>Recent Activity 📜</Title>

      <ActivityList>
        <ActivityItem>Added 10× USB Cables</ActivityItem>
        <ActivityItem>Removed 2× Apple Chargers</ActivityItem>
        <ActivityItem>Low stock alert: LED Bulbs</ActivityItem>
        <ActivityItem>Added new item: Cement Bags</ActivityItem>
      </ActivityList>
    </ActivityWrapper>
  );
}
